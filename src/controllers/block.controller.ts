import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import ConstantAPI from '@/constants/api.constant'
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
import ConstantMessage from '@/constants/message.constant'
import BaseController from './base.controller'
import Authenticated from '@/middlewares/authenticated.middleware'
import { verifyToken } from '@/validations/token.validation'
import BlockService from '@/services/block.service'
import { cloneDeep } from 'lodash'
import logger from '@/utils/logger.util'
import HttpExceptions from '@/utils/exceptions/http.exceptions'
import QueryMiddleware from '@/middlewares/quey.middleware'

class GroupSettingController implements Controller {
  public path: string
  public router: Router
  private baseController: BaseController
  private queryMiddleware: QueryMiddleware

  private service: BlockService
  private authenticated = new Authenticated()

  constructor() {
    this.path = ConstantAPI.BLOCK
    this.router = Router()
    this.baseController = new BaseController()
    this.service = new BlockService()
    this.authenticated = new Authenticated()
    this.queryMiddleware = new QueryMiddleware()

    this.authenticationForThisRoute()
    this.initialiseRoutes()
  }

  private authenticationForThisRoute(): void {
    this.router.use(verifyToken)
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, [this.queryMiddleware.run()], this.getList)
    this.router.post(`${this.path}`, this.create)
    this.router.delete(`${this.path}`, this.delete)
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { queryInfo } = req
      const { user } = req.session
      const subQuery = {
        filter: {
          blockerId: user?.id,
        },
      }
      const newQueryInfo = cloneDeep(queryInfo) || {}
      newQueryInfo.filter = {
        ...newQueryInfo.filter,
        ...subQuery.filter,
      }

      const result = await this.service.getList(newQueryInfo)
      this.baseController.onSuccessAsList(res, result, undefined, queryInfo)
    } catch (err) {
      logger.error(err)
      logger.error('cannot get the block list')

      next(
        new HttpExceptions(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
        ),
      )
    }
  }

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const { user } = req.session
      data.blockerId = user?.id
      const result = await this.service.create(data)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      logger.error(err)
      logger.error(ConstantMessage.CREATE_BLOCK_ERR)

      next(
        new HttpExceptions(
          ConstantHttpCode.SOMETHING_WENT_WRONG,
          ConstantHttpReason.SOMETHING_WENT_WRONG,
          ConstantMessage.CREATE_BLOCK_ERR,
        ),
      )
    }
  }

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const { user } = req.session
      data.blockerId = user?.id
      const result = await this.service.delete(data)
      this.baseController.onSuccess(res, {
        success: result,
      })
    } catch (err) {
      logger.error(err)
      logger.error(ConstantMessage.DELETE_BLOCK_ITEM_ERR)

      next(
        new HttpExceptions(
          ConstantHttpCode.SOMETHING_WENT_WRONG,
          ConstantHttpReason.SOMETHING_WENT_WRONG,
          ConstantMessage.DELETE_BLOCK_ITEM_ERR,
        ),
      )
    }
  }
}

export default GroupSettingController
