import { NextFunction } from 'express'
import HttpException from '@/utils/exceptions/http.exceptions'

import { verifyToken } from '@/validations/token.validation'

// message constant
import ConstantMessage from '@/constants/message.constant'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
import logger from '@/utils/logger.util'
import { Request, Response } from '@/interfaces/controller.interface'

class AuthenticatedMiddleware {
  public async verifyTokenAndAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    return await verifyToken(req, res, () => {
      try {
        // if (req?.user?.id === req?.session?.user?.id) {
        //   return next()
        // } else {
        //   logger.error(ConstantMessage.NOT_ALLOWED)
        //   logger.error(
        //     'authenticated.middleware.ts: verifyTokenAndAuthorization',
        //   )
        //   return next(
        //     new HttpException(
        //       ConstantHttpCode.FORBIDDEN,
        //       ConstantHttpReason.FORBIDDEN,
        //       ConstantMessage.NOT_ALLOWED,
        //     ),
        //   )
        // }

        return next()
      } catch (err) {
        logger.error(err)
        return next(
          new HttpException(
            ConstantHttpCode.FORBIDDEN,
            ConstantHttpReason.FORBIDDEN,
            ConstantMessage.NOT_ALLOWED,
          ),
        )
      }
    })
  }

  // public async verifyTokenAndAdmin(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<void> {
  //   return await verifyToken(req, res, () => {
  //     try {
  //       if (req?.user?.isAdmin) {
  //         return next()
  //       } else {
  //         return next(
  //           new HttpException(
  //             ConstantHttpCode.FORBIDDEN,
  //             ConstantHttpReason.FORBIDDEN,
  //             ConstantMessage.NOT_ALLOWED,
  //           ),
  //         )
  //       }
  //     } catch (err) {
  //       return next(
  //         new HttpException(
  //           ConstantHttpCode.FORBIDDEN,
  //           ConstantHttpReason.FORBIDDEN,
  //           ConstantMessage.NOT_ALLOWED,
  //         ),
  //       )
  //     }
  //   })
  // }
}

export default AuthenticatedMiddleware
