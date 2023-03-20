import QueryMiddleware from '@/middlewares/quey.middleware'
import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'

import PollValidate from '@/validations/poll.validation'
import validationMiddleware from '@/middlewares/validation.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantAPI from '@/constants/api.constant'
// message constant
// import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// import logger from '@/utils/logger.util'
import PollService from '@/services/poll.service'
import BaseController from './base.controller'
import ConstantMessage from '@/constants/message.constant'
import Message from '@/constants/message.constant'
import logger from '@/utils/logger.util'
import Authenticated from '@/middlewares/authenticated.middleware'

class PollController implements Controller {
  public path: string
  public router: Router
  public validate: PollValidate
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController
  private pollService: PollService
  private authenticated: Authenticated
  constructor() {
    this.path = `${ConstantAPI.POLL}`
    this.router = Router()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.pollService = new PollService()
    this.validate = new PollValidate()
    this.authenticated = new Authenticated()
    this.initialiseRoutes()
  }

  public initialiseRoutes(): void {
    this.router.get(`${this.path}`, [this.queryMiddleware.run()], this.getList)
    this.router.get(
      `${this.path}${ConstantAPI.POLL_INFO}`,
      [this.queryMiddleware.run()],
      this.getItem,
    )
    this.router.post(
      `${this.path}${ConstantAPI.POLL_CREATE}`,
      [validationMiddleware(this.validate.create)],
      this.create,
    )
    this.router.put(
      `${this.path}${ConstantAPI.POLL_UPDATE}`,
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
      const results = await this.pollService.getList(queryInfo)
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

      const user = await this.pollService.getItem(id, queryInfo)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_FOUND,
        data: {
          user,
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
      const data = req.body
      const user = req.session.user
      const result = await this.pollService.create(user, data)
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
  private update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const user = req.session.user
      const result = await this.pollService.update({
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

export default PollController
