#!/usr/bin/env ts-node

import 'module-alias/register'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import http from 'http'
import App from '..'
import SocketServer from './socket'

import Variable from '@/env/variable.env'
import logger from '@/utils/logger.util'

// controllers
import AuthController from '@/controllers/auth.controller'
import UserController from '@/controllers/user.controller'
// import GithubController from '@/controllers/github.controller'
import dotenv from 'dotenv'
import * as process from 'process'
import ErrorController from '@/controllers/error.controller'
import ImageController from '@/controllers/image.controller'
import PollController from '@/controllers/poll.controller'
import GroupController from '@/controllers/group.controller'

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
    new PollController(),
    new GroupController(),
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

const port = normalizePort(Variable.PORT || '5050')
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
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`
  logger.info(`Listening on ${bind}`)
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
setTimeout(async () => {
  await socketServer.initSocketServer()
  console.log(`Socket server run on ${SocketServer.SOCKET_PORT}`)
}, 0)

// export {app}
