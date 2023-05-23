import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import Validate from '@/validations/upvote.validation'
import VoteService from '@/services/vote.service'
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

class VoteController implements Controller {
  public path: string
  public router: Router
  private voteService: VoteService
  private validate: Validate
  private authenticated: Authenticated
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController

  constructor() {
    this.path = `${ConstantAPI.VOTE}`
    this.router = Router()
    this.voteService = new VoteService()
    this.validate = new Validate()
    this.authenticated = new Authenticated()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.VOTE_CREATE}`,
      verifyToken,
      this.authenticated.verifyTokenAndAuthorization,
      this.createUpVote,
    )

    this.router.delete(
      `${this.path}${ConstantAPI.VOTE_DELETE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.delete,
    )
    this.router.get(
      `${this.path}${ConstantAPI.GET_ALL_VOTES}`,
      [verifyToken, this.authenticated.verifyTokenAndAuthorization],
      this.getAllVotes,
    )
    this.router.put(
      `${this.path}${ConstantAPI.VOTE_UPDATE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.update,
    )
    this.router.get(
      `${this.path}${ConstantAPI.FIND_VOTE_BY_ID}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.find,
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
      const result = await this.voteService.createUpVote(data)
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
      const results = await this.voteService.findAll(queryInfo)
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
      const upVoteDelete = await this.voteService.delete(id)
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

  private find = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const result = await this.voteService.findById(id)
      this.baseController.onSuccess(res, result)
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.CAN_NOT_FIND,
          error,
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
      const result = await this.voteService.updateVote(id, data)
      this.baseController.onSuccess(res, result)
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.UPDATE_UPVOTE_ERR,
          error,
        ),
      )
    }
  }
}

export default VoteController
