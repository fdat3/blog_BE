import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import QueryMiddleware from '@/middlewares/quey.middleware'
import { NextFunction, Router } from 'express'

import ConstantAPI from '@/constants/api.constant'
import HttpException from '@/utils/exceptions/http.exceptions'
// message constant
// import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// import logger from '@/utils/logger.util'
import ConstantMessage from '@/constants/message.constant'
import Authenticated from '@/middlewares/authenticated.middleware'
import TransactionService from '@/services/transaction.service'
import { verifyToken } from '@/validations/token.validation'
import BaseController from './base.controller'

class TransactionController implements Controller {
  public path: string
  public router: Router

  private queryMiddleware: QueryMiddleware
  private baseController: BaseController
  private service: TransactionService
  private authenticated: Authenticated
  constructor() {
    this.path = `${ConstantAPI.TRANSACTION}`
    this.router = Router()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.service = new TransactionService()
    this.authenticated = new Authenticated()
    this.initialiseRoutes()
    // this.router.use(verifyToken)
  }

  public initialiseRoutes(): void {
    this.router.get(
      `${this.path}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAuthorization,
        this.queryMiddleware.run(),
      ],
      this.getList,
    )
    this.router.get(
      `${this.path}${ConstantAPI.TRANSACTION_INFO}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAuthorization,
        this.queryMiddleware.run(),
      ],
      this.getItem,
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
}

export default TransactionController
