import ConstantAPI from '@/constants/api.constant'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import HttpException from '@/utils/exceptions/http.exceptions'
import { NextFunction, Router } from 'express'
// message constant
// import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// import logger from '@/utils/logger.util'
import Authenticated from '@/middlewares/authenticated.middleware'
import BaseController from './base.controller'

import QueryMiddleware from '@/middlewares/quey.middleware'
import validationMiddleware from '@/middlewares/validation.middleware'
import ReportPollService from '@/services/reportPoll.service'
import logger from '@/utils/logger.util'
import ReportPollValidation from '@/validations/reportPoll.validation'
import { verifyToken } from '@/validations/token.validation'

class ReportPollController implements Controller {
  public path: string
  public router: Router
  private baseController: BaseController
  private service: ReportPollService
  private validate: ReportPollValidation
  private authenticated = new Authenticated()
  private queryMiddleware: QueryMiddleware

  constructor() {
    this.path = ConstantAPI.REPORT_POLL
    this.router = Router()
    this.baseController = new BaseController()
    this.service = new ReportPollService()
    this.validate = new ReportPollValidation()
    this.queryMiddleware = new QueryMiddleware()
    this.validate = new ReportPollValidation()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.get(
      `${this.path}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAdmin,
        this.queryMiddleware.run(),
      ],
      this.getList,
    )

    this.router.get(
      `${this.path}${ConstantAPI.REPORT_POLL_INFO}`,
      [verifyToken, this.authenticated.verifyTokenAndAuthorization],
      this.findOne,
    )

    this.router.post(
      `${this.path}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAuthorization,
        validationMiddleware(this.validate.create),
      ],
      this.create,
    )

    this.router.put(
      `${this.path}${ConstantAPI.REPORT_POLL_UPDATE}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAdmin,
        validationMiddleware(this.validate.update),
      ],
      this.update,
    )

    this.router.delete(
      `${this.path}${ConstantAPI.REPORT_POLL_DELETE}`,
      [verifyToken, this.authenticated.verifyTokenAndAdmin],
      this.delete,
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

  private findOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const { queryInfo } = req
      const result = await this.service.findOne(id, queryInfo)
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

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { body } = req
      const result = await this.service.create(body)
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

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const result = await this.service.delete(id)
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

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const { body } = req
      const result = await this.service.update(id, body)
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

export default ReportPollController
