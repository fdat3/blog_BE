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
import { verifyToken } from '@/validations/token.validation'

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
    // this.router.use(verifyToken)
  }

  public initialiseRoutes(): void {
    this.router.get(
      `${this.path}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAdmin,
        this.queryMiddleware.run(),
      ],
      this.getList,
    )
    this.router.post(
      `${this.path}${ConstantAPI.GROUP_CREATE}`,
      [verifyToken, validationMiddleware(this.validate.create)],
      this.create,
    )
    this.router.put(
      `${this.path}${ConstantAPI.GROUP_UPDATE}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAuthorization,
        validationMiddleware(this.validate.update),
      ],
      this.update,
    )

    this.router.get(
      `${this.path}${ConstantAPI.GROUP_JOIN}`,
      [verifyToken, this.authenticated.verifyTokenAndAuthorization],
      this.joinGroup,
    )

    this.router.get(
      `${this.path}${ConstantAPI.GROUP_LEAVE}`,
      [verifyToken, this.authenticated.verifyTokenAndAuthorization],
      this.leaveGroup,
    )

    this.router.get(
      `${this.path}${ConstantAPI.GROUP_PUBLIC}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAuthorization,
        this.queryMiddleware.run(),
      ],
      this.publicGroup,
    )

    this.router.get(
      `${this.path}${ConstantAPI.GROUP_INFO}`,
      [this.queryMiddleware.run()],
      this.getItem,
    )

    this.router.get(
      `${this.path}${ConstantAPI.GROUP_INFO_MEMBERS}`,
      [this.queryMiddleware.run()],
      this.getMembers,
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

      const item = await this.service.getItem(id, queryInfo)
      if (!item) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.GROUP_NOT_FOUND,
          ),
        )
      }

      this.baseController.onSuccess(res, item, undefined)
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

  private getMembers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const { queryInfo } = req

      const results = await this.service.getMembers(id, queryInfo || {})

      this.baseController.onSuccessAsList(res, results, undefined, queryInfo)
    } catch (err: any) {
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err || ConstantMessage.GROUP_MEMBER_NOT_FOUND,
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
      const { id } = req.params
      const result = await this.service.update(id, user?.id, {
        ...data,
        userId: user?.id,
      })

      // if (typeof result === 'boolean') {
      //   next(
      //     new HttpException(
      //       ConstantHttpCode.UNAUTHORIZED,
      //       ConstantHttpReason.UNAUTHORIZED,
      //       Message.GROUP_NO_AUTHORIZATION,
      //     )
      //   )
      // }

      this.baseController.onSuccess(res, result, undefined)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.UPDATE_GROUP_ERR,
          err,
        ),
      )
    }
  }

  private joinGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { user } = req.session
      const result = await this.service.joinGroup(user?.id, req.params.id)
      if (!result) {
        next(
          new HttpException(
            ConstantHttpCode.METHOD_FAILURE,
            ConstantHttpReason.METHOD_FAILURE,
            Message.JOIN_GROUP_ERR,
          ),
        )
      } else {
        this.baseController.onSuccess(res, result)
      }
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.JOIN_GROUP_ERR,
          err,
        ),
      )
    }
  }

  private leaveGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { user } = req.session
      const result = await this.service.leaveGroup(user?.id, req.params.id)
      if (!result) {
        next(
          new HttpException(
            ConstantHttpCode.METHOD_FAILURE,
            ConstantHttpReason.METHOD_FAILURE,
            Message.LEAVE_GROUP_ERR,
          ),
        )
      } else {
        this.baseController.onSuccess(res, result)
      }
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.LEAVE_GROUP_ERR,
          err,
        ),
      )
    }
  }

  private publicGroup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { queryInfo } = req
      const result = await this.service.publicGroup(queryInfo)
      this.baseController.onSuccessAsList(res, result, undefined, queryInfo)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.GET_MY_PUBLIC_GROUP_ERR,
          err,
        ),
      )
    }
  }
}

export default GroupController
