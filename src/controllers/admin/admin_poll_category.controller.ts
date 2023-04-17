import ConstantAPI from '@/constants/api.constant'
import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantMessage from '@/constants/message.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
import ConstantHttpCode from '@/constants/http.code.constant'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import PollCategoryService from '@/services/pollCategory.service'
import { Router, NextFunction } from 'express'
import BaseController from '../base.controller'
import QueryMiddleware from '@/middlewares/quey.middleware'
import AuthService from '@/services/auth.service'
import validationMiddleware from '@/middlewares/validation.middleware'
import PollCategoryValidate from '@/validations/pollCategory.validation'

class AdminPollCategoryController implements Controller {
  public path: string
  public router: Router
  private service: PollCategoryService
  private baseController: BaseController
  private queryMiddleware: QueryMiddleware
  private validate: PollCategoryValidate
  private authService: AuthService

  constructor() {
    this.path = '/'
    this.router = Router()
    this.service = new PollCategoryService()
    this.baseController = new BaseController()
    this.validate = new PollCategoryValidate()
    this.authService = new AuthService()
    this.queryMiddleware = new QueryMiddleware()

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.get(this.path, [this.queryMiddleware.run()], this.getList)
    this.router.get(
      ConstantAPI.ADMIN_POLL_CATEGORY_ITEM,
      [this.queryMiddleware.run()],
      this.findOne,
    )
    this.router.post(
      ConstantAPI.ADMIN_POLL_CATEGORY_ADD,
      [validationMiddleware(this.validate.create)],
      this.create,
    )
    this.router.put(
      ConstantAPI.ADMIN_POLL_CATEGORY_EDIT,
      [validationMiddleware(this.validate.update)],
      this.update,
    )
    this.router.delete(ConstantAPI.ADMIN_POLL_CATEGORY_DELETE, this.delete)
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { queryInfo } = req
      const users = await this.service.findAll(queryInfo)
      if (!users || users.rows?.length == 0) {
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

  private findOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const user = await this.service.findOne(id)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }
      this.baseController.onSuccess(res, user)
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
      const { body } = req
      const pollCategory = await this.service.create(body)
      this.baseController.onSuccess(res, pollCategory)
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

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { body } = req
      const { id } = req.params
      const pollCategory = await this.service.update(id, body)
      this.baseController.onSuccess(res, pollCategory)
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

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const pollCategory = await this.service.delete(id)
      this.baseController.onSuccess(res, pollCategory)
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

const adminPollCategoryController = new AdminPollCategoryController()
export default adminPollCategoryController
