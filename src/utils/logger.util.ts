import winston from 'winston'
import Variable from '@/env/variable.env'

import ConstantDateFormat from '@/constants/dateformat.constant'
import ConstantPath from '@/constants/path.constant'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  data: 5,
}

const level = (): string => {
  const env = Variable.NODE_ENV || 'development'
  const isDevelopment = ['development', 'local'].includes(env)
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'magenta',
  http: 'blue',
  debug: 'white',
  data: 'blue',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({
    format: ConstantDateFormat.YYYY_MM_DD_HH_MM_SS_MS,
  }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: ConstantPath.LOGS_ERROR,
    level: 'error',
  }),
  new winston.transports.File({ filename: ConstantPath.LOGS_ALL }),
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default logger
