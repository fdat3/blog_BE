import express, { Application, NextFunction, Request, Response } from 'express'

import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'

// const passport = require('passport')
import ErrorMiddleware from '@/middlewares/error.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'
import Controller from '@/interfaces/controller.interface'
import mongoConnectDB from '@/config/db.config'
import {
  postgresTestConnectDB,
  sequelize,
  syncSequelize,
} from '@/config/sql.config'

// variable
import Variable from '@/env/variable.env'

// api constant
import ConstantAPI from '@/constants/api.constant'

// message constant
import ConstantMessage from '@/constants/message.constant'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

import morgan from 'morgan'
import Versioning from '@/interfaces/versioning.interface'
import { initModels, Session } from '@/models/pg'
import runAdminPage from '@/admin/.'
import CamelCaseMiddleware from '@/middlewares/camelCase.middleware'

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const swaggerUi = require('swagger-ui-express')

class App {
  public app: Application
  // private readonly MONGO_DATABASE_URL: string;
  // private POSTGRES_DATABASE_URL: string;
  // private POSTGRES_DATABASE_NAME: string;
  // private POSTGRES_DATABASE_USERNAME: string;
  // private POSTGRES_DATABASE_PASSWORD: string;
  private readonly SESSION_SECRET: string
  private readonly SESSION_NAME: string
  private readonly SESSION_KEYS: string
  private readonly SESSION_MAX_AGE: number
  private readonly SESSION_RESAVE: boolean
  private readonly PORT: number

  constructor(versioning: Versioning) {
    this.app = express()
    // this.MONGO_DATABASE_URL = Variable.MONGO_DATABASE_URL;
    // this.POSTGRES_DATABASE_URL = Variable.POSTGRES_DATABASE_URL;
    // this.POSTGRES_DATABASE_NAME = Variable.POSTGRES_DATABASE_NAME;
    // this.POSTGRES_DATABASE_USERNAME = Variable.POSTGRES_DATABASE_USERNAME;
    // this.POSTGRES_DATABASE_PASSWORD = Variable.POSTGRES_DATABASE_PASSWORD;
    this.SESSION_SECRET = Variable.SESSION_SECRET
    this.SESSION_NAME = Variable.SESSION_NAME
    this.SESSION_KEYS = Variable.SESSION_KEYS
    this.SESSION_MAX_AGE = Variable.SESSION_MAX_AGE
    this.SESSION_RESAVE = Variable.SESSION_RESAVE
    this.PORT = Variable.PORT
    runAdminPage(this.app, this.PORT)
    // this.initialiseDatabaseConnection(this.MONGO_DATABASE_URL).then();
    this.initialisePostgresConnection().then()
    this.initialiseConfig()
    this.initialiseRoutes()
    this.initialiseControllers(versioning)
    this.initialiseErrorHandling()
  }

  private initialiseConfig(): void {
    // this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(compression())
    this.app.use(cors())
    this.app.use(helmet())
    // this.app.use(passport.initialise())
    // this.app.use(passport.session())
    this.app.use(bodyParser.json())
    this.app.use(CamelCaseMiddleware.convertCamelCase)

    this.app.use(morgan('combined'))
    this.app.disable('x-powered-by')

    // Session Config
    this.app.use(
      session({
        name: this.SESSION_NAME,
        keys: this.SESSION_KEYS.split(','), // key for encrypting cookie
        secret: this.SESSION_SECRET,
        resave: this.SESSION_RESAVE,
        saveUninitialized: true,
        cookie: {
          secure: true,
          httpOnly: true,
          expires: this.SESSION_MAX_AGE,
        },
        proxy: true,
        store: new SequelizeStore({
          db: sequelize,
          table: Session,
          extendDefaultFields: (defaults: any, session: any): any => {
            return {
              data: defaults.data,
              expires: defaults.expires,
              userId: session.userId,
            }
          },
        }),
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
