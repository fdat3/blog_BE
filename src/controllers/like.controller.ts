import ConstantAPI from '@/constants/api.constant'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import HttpException from '@/utils/exceptions/http.exceptions'
import { verifyToken } from '@/validations/token.validation'
import { NextFunction, Router } from 'express'
// message constant
// import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// import logger from '@/utils/logger.util'
import Message from '@/constants/message.constant'
import Authenticated from '@/middlewares/authenticated.middleware'
import QueryMiddleware from '@/middlewares/quey.middleware'
import validationMiddleware from '@/middlewares/validation.middleware'
import LikeService from '@/services/like.service'
import logger from '@/utils/logger.util'
import LikeValidation from '@/validations/like.validation'
import BaseController from './base.controller'

class LikeController implements Controller {
  public path: string
  public router: Router
  private baseController: BaseController
  private service: LikeService
  private authenticated = new Authenticated()
  private queryMiddleware: QueryMiddleware
  private validate: LikeValidation

  constructor() {
    this.path = ConstantAPI.LIKE
    this.router = Router()
    this.baseController = new BaseController()
    this.service = new LikeService()
    this.queryMiddleware = new QueryMiddleware()
    this.validate = new LikeValidation()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.LIKE_CREATE}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAuthorization,
        validationMiddleware(this.validate.create),
      ],
      this.create,
    )

    this.router.delete(
      `${this.path}${ConstantAPI.LIKE_DELETE}`,
      [this.queryMiddleware.run()],
      this.delete,
    )
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const { user } = req
      data.userId = user.id
      const result = await this.service.create(data)
      return this.baseController.onSuccess(res, result)
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.CREATE_LIKE_ERR,
          error,
        ),
      )
    }
  }

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const { user } = req
      const data = {
        userId: user.id,
        id,
      }
      const result = await this.service.delete(data)
      return this.baseController.onSuccess(res, result)
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.CREATE_LIKE_ERR,
          error,
        ),
      )
    }
  }
}

export default LikeController
