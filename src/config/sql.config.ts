import { Sequelize, UpdateOptions } from 'sequelize'
import VariableEnv from '@/env/variable.env'
import logger from '@/utils/logger.util'
import * as process from 'process'
const sequelizeTransforms = require('sequelize-transforms')

const {
  POSTGRES_DATABASE_URL,
  POSTGRES_DATABASE_NAME,
  POSTGRES_DATABASE_USERNAME,
  POSTGRES_DATABASE_PASSWORD,
} = VariableEnv

export const sequelize = new Sequelize(
  POSTGRES_DATABASE_NAME,
  POSTGRES_DATABASE_USERNAME,
  POSTGRES_DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: POSTGRES_DATABASE_URL,
    port: 5432,
    database: POSTGRES_DATABASE_NAME,
    logging: (sql: string): void => {
      process.env.NODE_ENV === 'local' && logger.http({ sql })
    },
    query: {
      raw: false,
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
      defaultScope: {
        attributes: {
          exclude: ['deletedAt'],
        },
      },
      scopes: {
        deleted: {
          paranoid: false,
          where: {
            deletedAt: {
              $not: null,
            },
          },
        },
        all: {
          paranoid: false,
        },
      },
      hooks: {
        beforeCreate: function (instance: any): void {
          // Slugify
          if (instance?.slug && instance.slug === '') {
            instance.slug = instance.slug
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')
          }
        },
        beforeUpdate: function (instance: any): void {
          instance.updatedAt = new Date()
          // Slugify
          if (instance?.slug && instance.slug === '') {
            instance.slug = instance.slug
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')
          }
        },
        beforeBulkUpdate: function (options: UpdateOptions): void {
          options.individualHooks = true
        },
      },
    },
  },
)

// Add sequelize-transforms
// Docs: https://www.npmjs.com/package/sequelize-transforms
sequelizeTransforms(sequelize)

export const postgresTestConnectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    logger.info('Postgres connection has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
  }
}

export const syncSequelize = async (): Promise<void> => {
  try {
    await sequelize.sync({
      force: true,
      alter: true,
      logging: (sql: string) => {
        // return process.env.LOGGING === 'true' && logger.http(sql)
        logger.http(sql)
      },
    })
    logger.info('Sequelize sync has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
  }
}