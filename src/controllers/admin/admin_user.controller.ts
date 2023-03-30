import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'

import { NextFunction, Router } from 'express'
import BaseController from '@/controllers/base.controller'
import QueryMiddleware from '@/middlewares/quey.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
import ConstantMessage from '@/constants/message.constant'
import UserService from '@/services/user.service'

export class AdminUserController implements Controller {
  path: string
  router: Router
  private baseController: BaseController
  private queryMiddleware: QueryMiddleware
  private userService: UserService

  constructor() {
    this.path = '/'
    this.router = Router()
    this.baseController = new BaseController()
    this.queryMiddleware = new QueryMiddleware()
    this.userService = new UserService()

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.get(this.path, [this.queryMiddleware.run()], this.getList)
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { queryInfo } = req
      const users = await this.userService.findAll(queryInfo)
      if (!users || users.rows.lenght == 0) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }
      this.baseController.onSuccessAsList(res, users, undefined, queryInfo)
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

const adminUserController: AdminUserController = new AdminUserController()

export default adminUserController
