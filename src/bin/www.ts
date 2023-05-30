import 'module-alias/register'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import http from 'http'
import App from '..'
import SocketServer from './socket'

import Variable from '@/env/variable.env'
import logger from '@/utils/logger.util'

// controllers
// import AuthController from '@/controllers/auth.controller'
import UserController from '@/controllers/user.controller'
// import GithubController from '@/controllers/github.controller'
import dotenv from 'dotenv'
import process from 'node:process'
import ErrorController from '@/controllers/error.controller'
import ImageController from '@/controllers/image.controller'
// import AdminController from '@/controllers/admin.controller'
import CheckHelper from '@/helpers/check.helper'
import TelegramUtil from '@/utils/telegram.util'
import BlogController from '@/controllers/blog.controller'
import AuthController from '@/controllers/auth.controller'
import VoteController from '@/controllers/vote.controller'
import CommentController from '@/controllers/comment.controller'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
dotenv.config({ path: `.env.local`, override: true })

logger.warn(
  `Process run on ${process.env?.NODE_ENV?.toUpperCase()} Environment!`,
)

const { app } = new App({
  v1: [
    new AuthController(),
    new UserController(),
    new ImageController(),
    new BlogController(),
    new VoteController(),
    new CommentController(),
    new ImageController(),
    // new AdminController(),
  ],
})

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: any): string | number | boolean => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const port = normalizePort(Variable.PORT || '6000')
app.set('port', port)

/**
 * Create HTTP server.
 * Create Socket Server.
 * Create Admin Page.
 */
const server = http.createServer(app)
const socketServer = new SocketServer(app)

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: any): void => {
  console.error(error)
  setTimeout(() => {
    ErrorController.sendErrorToTelegram(error)
      .then((result) => {
        logger.info(result.json())
      })
      .catch((err) => {
        logger.error(err)
      })
  }, 0)
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = (): void => {
  const addr = server.address()
  const ip = typeof addr === 'string' ? addr : addr?.address
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`
  logger.info(`Server run at IP: ${ip}`)
  logger.info(`Listening on ${bind}`)
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
setTimeout(async () => {
  await socketServer.initSocketServer()
  console.log(`Socket server run on ${SocketServer.SOCKET_PORT}`)
}, 0)

// Send Telegram that server is running
setTimeout(() => {
  const message = `Event: Server is running on ${
    process.env.NODE_ENV
  } environment at ${new Date().toLocaleString()}`
  TelegramUtil.sendToTelegram(message, undefined, true), 0
})

// Check overload of server
setInterval(() => {
  CheckHelper.checkOverload()
}, 10000)

process.on('SIGINT', async (code) => {
  logger.info(`Process is terminated by ${code.toString()}`)
  await ErrorController.sendSignalToTelegram(code.toString()).catch((err) => {
    logger.error(err)
  })
  process.exit(0)
})

process.on('SIGTERM', async (code) => {
  logger.info(`Process is terminated by ${code.toString()}`)
  await ErrorController.sendSignalToTelegram(code.toString()).catch((err) => {
    logger.error(err)
  })
  process.exit(0)
})

process.on('SIGQUIT', async (code) => {
  logger.info(`Process is terminated by ${code.toString()}`)
  await ErrorController.sendSignalToTelegram(code.toString()).catch((err) => {
    logger.error(err)
  })
  process.exit(0)
})
