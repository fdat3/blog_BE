import { NextFunction, Request, Response, Router } from 'express'

import Controller from '@/interfaces/controller.interface'
import MbtiValidation from '@/validations/mbti.validation'

import HttpException from '@/utils/exceptions/http.exceptions'

// api constant
import ConstantAPI from '@/constants/api.constant'

// message constant
import ConstantMessage from '@/constants/message.constant'

// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

// logger
import MbtiService from '@/services/mbti.service'
import validationMiddleware from '@/middlewares/validation.middleware'
import logger from '@/utils/logger.util'

class MbtiController implements Controller {
  public path: string
  public router: Router
  private validate: MbtiValidation
  private service: MbtiService

  constructor() {
    this.path = `${ConstantAPI.MBTI}`
    this.router = Router()
    this.validate = new MbtiValidation()
    this.service = new MbtiService()

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}${ConstantAPI.MBTI_GET_ALL}`, this.getList)
    this.router.get(`${this.path}${ConstantAPI.MBTI_GET}`, this.getItem)
    this.router.post(
      `${this.path}${ConstantAPI.MBTI_GET_ALL}`,
      validationMiddleware(this.validate.create),
      this.create,
    )
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const mbtis = await this.service.findAll()
      if (!mbtis || mbtis.lenght == 0) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.MBTI_NOT_FOUND,
          ),
        )
      }

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        data: {
          mbtis: mbtis,
        },
      })
    } catch (err: any) {
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err?.message,
        ),
      )
    }
  }

  private getItem = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.params
      logger.info({ id })
      const mbti = await this.service.findById(id)
      if (!mbti) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.MBTI_NOT_FOUND,
          ),
        )
      }

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        data: {
          mbti: mbti,
        },
      })
    } catch (err: any) {
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err?.message,
        ),
      )
    }
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { label } = req.body

      const labelValidate = this.validate.labelValidate(label)
      if (!labelValidate) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.LABEL_NOT_VALID,
          ),
        )
      }

      const mbti = await this.service.create(label)
      if (!mbti) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.MBTI_NOT_CREATED,
          ),
        )
      }

      return res.status(ConstantHttpCode.CREATED).json({
        status: {
          code: ConstantHttpCode.CREATED,
          msg: ConstantHttpReason.CREATED,
        },
        msg: ConstantMessage.MBTI_HAS_BEEN_CREATED,
        data: mbti,
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
  }
}

export default MbtiController
