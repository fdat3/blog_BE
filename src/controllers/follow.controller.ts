import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantAPI from '@/constants/api.constant'
// message constant
// import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// import logger from '@/utils/logger.util'
import BaseController from './base.controller'
import Authenticated from '@/middlewares/authenticated.middleware'
import FollowService from '@/services/follow.service'
import QueryMiddleware from '@/middlewares/quey.middleware'
import logger from '@/utils/logger.util'
import FollowValidation from '@/validations/follow.validation'
import validationMiddleware from '@/middlewares/validation.middleware'

class FollowController implements Controller {
  public path: string
  public router: Router
  private baseController: BaseController
  private service: FollowService
  private authenticated = new Authenticated()
  private queryMiddleware: QueryMiddleware
  private validate: FollowValidation

  constructor() {
    this.path = ConstantAPI.FOLLOW
    this.router = Router()
    this.baseController = new BaseController()
    this.service = new FollowService()
    this.queryMiddleware = new QueryMiddleware()
    this.validate = new FollowValidation()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, [this.queryMiddleware.run()], this.getList)
    this.router.get(
      `${this.path}${ConstantAPI.FOLLOW_FOLLOWED}`,
      [this.queryMiddleware.run()],
      this.getFollowedList,
    )
    this.router.get(
      `${this.path}${ConstantAPI.FOLLOW_FOLLOWING}`,
      [this.queryMiddleware.run()],
      this.getFollowingList,
    )
    this.router.post(
      `${this.path}${ConstantAPI.FOLLOW_ADD}`,
      [validationMiddleware(this.validate.create)],
      this.addFollower,
    )
    this.router.delete(
      `${this.path}${ConstantAPI.FOLLOW_REMOVE}`,
      [validationMiddleware(this.validate.delete)],
      this.removeFollowedItem,
    )

    this.router.get(
      `${this.path}${ConstantAPI.FOLLOW_BACK}`,
      [this.queryMiddleware.run()],
      this.removeFollowedItem,
    )
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { queryInfo } = req
      const results = await this.service.getList(queryInfo)
      this.baseController.onSuccessAsList(res, results, undefined, queryInfo)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          '',
          err,
        ),
      )
    }
  }

  private getFollowedList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { user } = req.session
      const queryInfo = req.queryInfo

      const result = await this.service.getFollowedList(user?.id, queryInfo)
      this.baseController.onSuccessAsList(res, result, undefined, queryInfo)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          '',
          err,
        ),
      )
    }
  }

  private getFollowingList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { user } = req.session
      const queryInfo = req.queryInfo

      const result = await this.service.getFollowedList(user?.id, queryInfo)
      this.baseController.onSuccessAsList(res, result, undefined, queryInfo)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          '',
          err,
        ),
      )
    }
  }

  private addFollower = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { user } = req.session
      const { followedId } = req.body

      const result = await this.service.addFollower(user?.id, followedId)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          '',
          err,
        ),
      )
    }
  }

  private removeFollowedItem = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { user } = req.session
      const { followedId } = req.body

      const result = await this.service.removeFollowedItem(user?.id, followedId)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          '',
          err,
        ),
      )
    }
  }
}

export default FollowController
