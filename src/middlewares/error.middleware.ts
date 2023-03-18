import { NextFunction, Request, Response } from 'express'
import HttpException from '@/utils/exceptions/http.exceptions'

// http constant
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// message constant
import ConstantMessage from '@/constants/message.constant'
import ErrorController from '@/controllers/error.controller'
import logger from '@/utils/logger.util'
import * as process from 'process'

const errorMiddleware = (
  error: HttpException,
  _req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    if (
      process?.env?.NODE_ENV &&
      ['production', 'development', 'local'].includes(process.env.NODE_ENV)
    ) {
      setTimeout(() => {
        ErrorController.sendErrorToTelegram(error).catch((err) => {
          logger.error(err)
        })
      }, 0)
    }
    const statusCode =
      error.statusCode ?? ConstantHttpCode.INTERNAL_SERVER_ERROR
    const statusMsg =
      error.statusMsg ?? ConstantHttpReason.INTERNAL_SERVER_ERROR
    const msg = error.msg ?? ConstantMessage.SOMETHING_WENT_WRONG

    return res.status(statusCode).send({
      status: {
        code: statusCode,
        msg: statusMsg,
      },
      msg: msg,
    })
  } catch (err) {
    return next(err)
  }
}

export default errorMiddleware
