import QueryMiddleware from '@/middlewares/quey.middleware'
import { Router, NextFunction } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'

import Validate from '@/validations/user.validation'
// import validationMiddleware from '@/middlewares/validation.middleware'

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
class PollController implements Controller {
  public path: string
  public router: Router
  private service
  private validate: Validate
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController
  constructor() {
    this.path = `${ConstantAPI.POLL}`
    this.router = Router()
    this.service = new PollService()
    this.validate = new Validate()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.initialiseRoutes()

    console.log(this.router.stack)
  }

  public initialiseRoutes(): void {
    this.router.get(`${this.path}`, [this.queryMiddleware.run()], this.getList)
  }

  private async getList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Request | any> {
    try {
      const { queryInfo } = req
      const results = await this.service.findAll(queryInfo)
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
}

export default PollController
