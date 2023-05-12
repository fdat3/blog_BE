import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import Validate from '@/validations/upvote.validation'
import UpVoteService from '@/services/upvote.service'
// import validationMiddleware from '@/middlewares/validation.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'
// api constant
import ConstantAPI from '@/constants/api.constant'
// message constant
import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// logger
import logger from '@/utils/logger.util'
import Authenticated from '@/middlewares/authenticated.middleware'
import Message from '@/constants/message.constant'
import QueryMiddleware from '@/middlewares/quey.middleware'
import BaseController from './base.controller'
import { verifyToken } from '@/validations/token.validation'

class UpVoteController implements Controller {
  public path: string
  public router: Router
  private upVoteService: UpVoteService
  private validate: Validate
  private authenticated: Authenticated
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController

  constructor() {
    this.path = `${ConstantAPI.UPVOTE}`
    this.router = Router()
    this.upVoteService = new UpVoteService()
    this.validate = new Validate()
    this.authenticated = new Authenticated()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.UPVOTE_CREATE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.createUpVote,
    )

    this.router.delete(
      `${this.path}${ConstantAPI.UPVOTE_DELETE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.delete,
    )
    this.router.get(
      `${this.path}${ConstantAPI.GET_ALL_VOTES}`,
      [verifyToken, this.authenticated.verifyTokenAndAuthorization],
      this.getAllVotes,
    )
  }

  private createUpVote = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const { user } = req
      data.userId = user.id
      const result = await this.upVoteService.createUpVote(data)
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.UPVOTE_CREATE_SUCCESS,
        data: {
          result,
        },
      })
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.UPVOTE_NOT_CREATE,
          error,
        ),
      )
    }
  }

  private getAllVotes = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { queryInfo } = req
      const results = await this.upVoteService.findAll(queryInfo)
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
  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const upVoteDelete = await this.upVoteService.delete(id)
      if (!upVoteDelete) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.DELETE_UPVOTE_ERR,
          ),
        )
      }
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: Message.UPVOTE_DELETE_SUCCESS,
      })
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.DELETE_UPVOTE_ERR,
          error,
        ),
      )
    }
  }
}

export default UpVoteController
