import QueryMiddleware from '@/middlewares/quey.middleware'
import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'

import validationMiddleware from '@/middlewares/validation.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantAPI from '@/constants/api.constant'
// message constant
// import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// import logger from '@/utils/logger.util'
import BaseController from './base.controller'
import ConstantMessage from '@/constants/message.constant'
import Message from '@/constants/message.constant'
import logger from '@/utils/logger.util'
import Authenticated from '@/middlewares/authenticated.middleware'
import GroupService from '@/services/group.service'
import GroupValidation from '@/validations/group.validation'

class GroupController implements Controller {
  public path: string
  public router: Router
  public validate: GroupValidation
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController
  private service: GroupService
  private authenticated: Authenticated
  constructor() {
    this.path = `${ConstantAPI.GROUP}`
    this.router = Router()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.service = new GroupService()
    this.validate = new GroupValidation()
    this.authenticated = new Authenticated()
    this.initialiseRoutes()
  }

  public initialiseRoutes(): void {
    this.router.get(`${this.path}`, [this.queryMiddleware.run()], this.getList)
    this.router.get(
      `${this.path}${ConstantAPI.GROUP_INFO}`,
      [this.queryMiddleware.run()],
      this.getItem,
    )
    this.router.post(
      `${this.path}${ConstantAPI.GROUP_CREATE}`,
      [validationMiddleware(this.validate.create)],
      this.create,
    )
    this.router.put(
      `${this.path}${ConstantAPI.GROUP_UPDATE}`,
      [
        this.authenticated.verifyTokenAndAuthorization,
        validationMiddleware(this.validate.update),
      ],
      this.update,
    )
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Request | any> => {
    try {
      const { queryInfo } = req
      const results = await this.service.getList(queryInfo)
      this.baseController.onSuccessAsList(res, results, undefined, queryInfo)
    } catch (err: any) {
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err?.message,
          err,
        ),
      )
    }
  }

  private getItem = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const { queryInfo } = req

      const poll = await this.service.getItem(id, queryInfo)
      if (!poll) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.GROUP_NOT_FOUND,
          ),
        )
      }

      this.baseController.onSuccess(res, poll, undefined)
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
      const data = req.body
      const user = req.session.user
      const result = await this.service.create(user, data)
      this.baseController.onSuccess(res, result, undefined)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.CREAT_GROUP_ERR,
          err,
        ),
      )
    }
  }
  private update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const user = req.session.user
      const result = await this.service.update({
        ...data,
        userId: user?.id,
      })
      this.baseController.onSuccess(res, result, undefined)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.CREAT_POLL_ERR,
          err,
        ),
      )
    }
  }
}

export default GroupController
