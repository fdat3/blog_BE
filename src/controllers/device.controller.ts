import QueryMiddleware from '@/middlewares/quey.middleware'
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
import ConstantMessage from '@/constants/message.constant'
import Authenticated from '@/middlewares/authenticated.middleware'
import DeviceService from '@/services/device.service'
import { verifyToken } from '@/validations/token.validation'

class DeviceController implements Controller {
  public path: string
  public router: Router
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController
  private service: DeviceService
  private authenticated: Authenticated
  constructor() {
    this.path = `${ConstantAPI.DEVICE}`
    this.router = Router()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.service = new DeviceService()
    this.authenticated = new Authenticated()
    this.initialiseRoutes()
  }

  public initialiseRoutes(): void {
    this.router.get(`${this.path}`, [this.queryMiddleware.run()], this.getList)

    this.router.delete(
      `${this.path}${ConstantAPI.DEVICE_DELETE}`,
      [verifyToken],
      this.delete,
    )
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Request | any> => {
    try {
      const { queryInfo } = req
      const filter = {
        ...queryInfo?.filter,
        deviceId: req?.fingerprint?.hash,
      }

      const newQueryInfo = {
        ...queryInfo,
        filter,
      }

      const results = await this.service.getList(newQueryInfo)
      this.baseController.onSuccessAsList(res, results, undefined, newQueryInfo)
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

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params

      const item = await this.service.getItem(id)

      if (!item) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.POLL_NOT_FOUND,
          ),
        )
      }

      const result = await this.service.delete(id)

      this.baseController.onSuccess(res, result, undefined)
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

export default DeviceController
