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
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
import PollService from '@/services/poll.service'
import BaseController from '../base.controller'
import ConstantMessage from '@/constants/message.constant'
import Message from '@/constants/message.constant'
import logger from '@/utils/logger.util'
import Authenticated from '@/middlewares/authenticated.middleware'

class AdminPollController implements Controller {
  public path: string
  public router: Router
  public validate: PollValidate
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController
  private pollService: PollService
  private authenticated: Authenticated
  constructor() {
    this.path = '/'
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
      `${this.path}${ConstantAPI.POLL_POPULARITY}`,
      [this.queryMiddleware.run()],
      this.getPopularity,
    )

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
      [validationMiddleware(this.validate.update)],
      this.update,
    )
    this.router.delete(`${this.path}${ConstantAPI.POLL_DELETE}`, this.delete)
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

      const poll = await this.pollService.getItem(id, queryInfo)
      if (!poll) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.POLL_NOT_FOUND,
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
      const result = await this.pollService.create(user, data)
      this.baseController.onSuccess(res, result, undefined)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.CREATE_POLL_ERR,
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
      const { id } = req.params
      const result = await this.pollService.adminUpdate(id, {
        ...data,
      })
      this.baseController.onSuccess(res, result, undefined)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.CREATE_POLL_ERR,
          err,
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
      const user = req.session.user
      const result = await this.pollService.delete({
        filter: {
          id,
          user_id: user?.id,
        },
      })
      this.baseController.onSuccess(res, result, undefined)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.DELETE_POLL_ERR,
          err,
        ),
      )
    }
  }

  private getPopularity = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { queryInfo } = req
      const result = await this.pollService.getPopularity(queryInfo)

      this.baseController.onSuccessAsList(res, result, undefined, queryInfo)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.GET_POPULARITY_POLL_ERR,
          err,
        ),
      )
    }
  }
}

export default new AdminPollController()
