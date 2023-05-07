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
// import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// logger
import logger from '@/utils/logger.util'
import Authenticated from '@/middlewares/authenticated.middleware'
import Message from '@/constants/message.constant'
import QueryMiddleware from '@/middlewares/quey.middleware'
import BaseController from './base.controller'

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
      // validationMiddleware(this.validate.create),
      this.createUpVote,
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
      const result = await this.upVoteService.create(data)
      return this.baseController.onSuccess(res, result)
    } catch (error) {
      logger.error(error)
      console.log('checking err:', error)

      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.BLOG_NOT_CREATE,
          error,
        ),
      )
    }
  }
}

export default UpVoteController
