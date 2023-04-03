import express, { Application, NextFunction, Request, Response } from 'express'

import bodyParser from 'body-parser'
import compression from 'compression'
import RedisStore from 'connect-redis'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import Redis from 'ioredis'
// const passport = require('passport')
import mongoConnectDB from '@/config/db.config'
import { postgresTestConnectDB, syncSequelize } from '@/config/sql.config'
import Controller from '@/interfaces/controller.interface'
import ErrorMiddleware from '@/middlewares/error.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'

// variable
import Variable from '@/env/variable.env'

// api constant
import ConstantAPI from '@/constants/api.constant'

// message constant
import ConstantMessage from '@/constants/message.constant'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

import Versioning from '@/interfaces/versioning.interface'
import { initModels } from '@/models/pg'
import morgan from 'morgan'
import { redis } from '@/config/redis.config'
// import runAdminPage from '@/admin/.'
const session = require('express-session')
const Fingerprint = require('express-fingerprint')

// const SequelizeStore = require('connect-session-sequelize')(session.Store)

const swaggerUi = require('swagger-ui-express')

class App {
  public app: Application
  private readonly MONGO_DATABASE_URL: string
  private readonly SESSION_SECRET: string
  private readonly SESSION_NAME: string
  private readonly SESSION_KEYS: string
  private readonly SESSION_MAX_AGE: number
  private readonly SESSION_RESAVE: boolean
  private readonly PORT: number
  private readonly clientRedis
  private readonly redisStore

  constructor(versioning: Versioning) {
    this.clientRedis =
      Variable.NODE_ENV === 'local'
        ? new Redis()
        : Variable.USE_LOCAL_REDIS === 'true'
        ? new Redis()
        : redis
    this.redisStore = new RedisStore({
      client: this.clientRedis,
      prefix: 'trendypoll:',
    })
    this.app = express()

    this.MONGO_DATABASE_URL = Variable.MONGO_DATABASE_URL
    this.SESSION_SECRET = Variable.SESSION_SECRET
    this.SESSION_NAME = Variable.SESSION_NAME
    this.SESSION_KEYS = Variable.SESSION_KEYS
    this.SESSION_MAX_AGE = Variable.SESSION_MAX_AGE
    this.SESSION_RESAVE = Variable.SESSION_RESAVE
    this.PORT = Variable.PORT
    // runAdminPage(this.app, this.PORT)
    this.initialiseDatabaseConnection(this.MONGO_DATABASE_URL).then()
    this.initialisePostgresConnection().then()
    this.initialiseConfig()
    this.initialiseRoutes()
    this.initialiseControllers(versioning)
    this.initialiseErrorHandling()
  }

  private initialiseConfig(): void {
    this.app.set('trust proxy', 1)
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
        limit: '50mb',
      }),
    )
    this.app.use(cookieParser())
    this.app.use(compression())
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(
      bodyParser.json({
        limit: '50mb',
      }),
    )
    // this.app.use(CamelCaseMiddleware.convertCamelCase)

    this.app.use(morgan('combined'))
    this.app.disable('x-powered-by')
    this.app.use(
      Fingerprint({
        parameters: [
          Fingerprint.useragent,
          Fingerprint.acceptHeaders,
          Fingerprint.geoip,
        ],
      }),
    )

    if (this.app.get('env') === 'production') {
      this.app.set('trust proxy', 1) // trust first proxy
    }

    // Session Config
    this.app.use(
      session({
        name: this.SESSION_NAME,
        keys: this.SESSION_KEYS.split(','), // key for encrypting cookie
        secret: this.SESSION_SECRET,
        resave: this.SESSION_RESAVE,
        store: this.redisStore,
        saveUninitialized: true,
        cookie: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
        },
        expires: this.SESSION_MAX_AGE,
        proxy: process.env.NODE_ENV === 'production',
      }),
    )
  }

  private initialiseRoutes(): void {
    this.app.get(
      ConstantAPI.ROOT,
      (_req: Request, res: Response, next: NextFunction) => {
        try {
          return res.status(ConstantHttpCode.OK).json({
            status: {
              code: ConstantHttpCode.OK,
              msg: ConstantHttpReason.OK,
            },
            msg: ConstantMessage.API_WORKING,
          })
        } catch (err: any) {
          return next(
            new HttpException(
              ConstantHttpCode.INTERNAL_SERVER_ERROR,
              ConstantHttpReason.INTERNAL_SERVER_ERROR,
              err.message,
            ),
          )
        }
      },
    )

    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(require('@/swagger/output_swagger.json'), {
        explorer: true,
      }),
    )
  }

  private initialiseControllers(versioning: Versioning): void {
    Object.keys(versioning).forEach((version) => {
      const controllers: Controller[] = versioning[version]
      controllers.forEach((controller: Controller) => {
        this.app.use(`/${version}`, controller.router)
      })
    })
  }

  private initialiseErrorHandling(): void {
    this.app.use(ErrorMiddleware)
  }

  private async initialiseDatabaseConnection(url: string): Promise<void> {
    await mongoConnectDB(url)
  }

  private async initialisePostgresConnection(): Promise<void> {
    await postgresTestConnectDB()
      .then(() => {
        initModels()
      })
      .then(() => {
        process.env.NODE_ENV !== 'production' && syncSequelize()
      })
  }
}

export default App
