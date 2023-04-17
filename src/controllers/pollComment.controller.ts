import ConstantAPI from '@/constants/api.constant'
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
import Message from '@/constants/message.constant'
import baseController from '@/controllers/base.controller'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import Authenticated from '@/middlewares/authenticated.middleware'
import QueryMiddleware from '@/middlewares/quey.middleware'
import validationMiddleware from '@/middlewares/validation.middleware'
import PollCommentService from '@/services/pollComment.service'
import HttpException from '@/utils/exceptions/http.exceptions'
import logger from '@/utils/logger.util'
import PollCommentValidation from '@/validations/pollComment.validation'
import { verifyToken } from '@/validations/token.validation'
import { NextFunction, Router } from 'express'

class PollCommentController implements Controller {
  public path = ConstantAPI.POLL_COMMENT
  public router = Router()
  public validate = new PollCommentValidation()
  public baseController = new baseController()
  public authenticated = new Authenticated()
  public queryMiddleware = new QueryMiddleware()
  public service = new PollCommentService()

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes(): void {
    // this.router.get(`${this.path}`, [this.queryMiddleware.run()], this.getList);
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
      `${this.path}${ConstantAPI.POLL_COMMENT_UPDATE}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAuthorization,
        validationMiddleware(this.validate.create),
      ],
      this.create,
    )

    this.router.delete(
      `${this.path}${ConstantAPI.POLL_COMMENT_DELETE}`,
      [verifyToken, this.authenticated.verifyTokenAndAuthorization],
      this.delete,
    )

    this.router.post(
      `${this.path}${ConstantAPI.POLL_COMMENT_LIKE}`,
      [verifyToken, this.authenticated.verifyTokenAndAuthorization],
      this.like,
    )

    this.router.delete(
      `${this.path}${ConstantAPI.POLL_COMMENT_LIKE}`,
      [verifyToken, this.authenticated.verifyTokenAndAuthorization],
      this.unlike,
    )
  }

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = req.body
      data.userId = req.user.id

      const result = await this.service.create(data)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.CREATE_POLL_COMMENT_ERR,
          err,
        ),
      )
    }
  }

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params
      const data = req.body
      data.userId = req.user.id

      const result = await this.service.update(id, data)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.UPDATE_POLL_COMMENT_ERR,
          err,
        ),
      )
    }
  }

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params

      const result = await this.service.delete(id, req.user.id)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.DELETE_POLL_COMMENT_ERR,
          err,
        ),
      )
    }
  }

  public like = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params

      const result = await this.service.createLike(id, req.user.id)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.LIKE_POLL_COMMENT_ERR,
          err,
        ),
      )
    }
  }

  public unlike = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params

      const result = await this.service.createLike(id, req.user.id)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.METHOD_FAILURE,
          ConstantHttpReason.METHOD_FAILURE,
          Message.UNLIKE_POLL_COMMENT_ERR,
          err,
        ),
      )
    }
  }
}

export default PollCommentController
