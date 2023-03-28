import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import HttpException from '@/utils/exceptions/http.exceptions'

// variable
import Variable from '@/env/variable.env'

// message constant
import ConstantMessage from '@/constants/message.constant'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const bearer = req.headers.authorization

  if (!bearer) {
    return next(
      new HttpException(
        ConstantHttpCode.UNAUTHORIZED,
        ConstantHttpReason.UNAUTHORIZED,
        ConstantMessage.TOKEN_NOT_VALID,
      ),
    )
  }

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(
      new HttpException(
        ConstantHttpCode.UNAUTHORIZED,
        ConstantHttpReason.UNAUTHORIZED,
        ConstantMessage.UNAUTHORIZED,
      ),
    )
  }

  const accessToken = bearer.split('Bearer ')[1].trim()

  const checkDeviceId = req.fingerprint?.hash
  if (checkDeviceId) {
    jwt.verify(
      req.cookies['jwt'],
      Variable.JWT_SECRET,
      (err: VerifyErrors | null, payload: any) => {
        if (err) {
          res.status(ConstantHttpCode.FORBIDDEN).json({
            status: {
              code: ConstantHttpCode.FORBIDDEN,
              msg: ConstantHttpReason.FORBIDDEN,
            },
            msg: ConstantMessage.TOKEN_NOT_VALID,
          })
        }

        if (checkDeviceId !== payload.deviceId) {
          res.status(ConstantHttpCode.FORBIDDEN).json({
            status: {
              code: ConstantHttpCode.FORBIDDEN,
              msg: ConstantHttpReason.FORBIDDEN,
            },
            msg: ConstantMessage.TOKEN_NOT_ISSUED_FOR_THIS_DEVICE,
          })
        }

        return payload
      },
    )
  }

  return jwt.verify(accessToken, Variable.JWT_SECRET, (err, user: any) => {
    if (err) {
      res.status(ConstantHttpCode.FORBIDDEN).json({
        status: {
          code: ConstantHttpCode.FORBIDDEN,
          msg: ConstantHttpReason.FORBIDDEN,
        },
        msg: ConstantMessage.TOKEN_NOT_VALID,
      })
    }

    req.user = user
    return next()
  })
}

export default { verifyToken }
