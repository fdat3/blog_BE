import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Application } from 'express'
import logger from '@/utils/logger.util'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import Variable from '@/env/variable.env'
import * as process from 'process'
import * as AdminJSSequelize from '@adminjs/sequelize'
import * as Models from '@/models/pg'
import { sequelize } from '@/config/sql.config'

AdminJS.registerAdapter({
  Database: AdminJSSequelize.Database,
  Resource: AdminJSSequelize.Resource,
})

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (
  email: string,
  password: string,
): Promise<any | null> => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

const runAdminPage = (app: Application, PORT: number): void => {
  const admin = new AdminJS({
    resources: [
      Models.User.initModel(sequelize),
      Models.Poll.initModel(sequelize),
      {
        resource: Models.PollComment.initModel(sequelize),
        options: {
          properties: {},
        },
      },
      // Models.PollAnswer.initModel(sequelize),
      Models.Mbti.initModel(sequelize),
      Models.ReportUser.initModel(sequelize),
      Models.ReportPoll.initModel(sequelize),
    ],
  })

  const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: `postgres://${Variable.POSTGRES_DATABASE_USERNAME}:${Variable.POSTGRES_DATABASE_PASSWORD}@${Variable.POSTGRES_DATABASE_URL}`,
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  })

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    },
  )

  process.env.NODE_ENV === 'development' && admin.watch()

  app.use(admin.options.rootPath, adminRouter)

  logger.info(
    `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`,
  )
}

export default runAdminPage
