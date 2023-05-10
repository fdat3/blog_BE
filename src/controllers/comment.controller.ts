import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import Validate from '@/validations/comment.validation'
import CommentService from '@/services/comment.service'
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

class CommentController implements Controller {
  public path: string
  public router: Router
  private commentService: CommentService
  private validate: Validate
  private authenticated: Authenticated
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController

  constructor() {
    this.path = `${ConstantAPI.COMMENTS}`
    this.router = Router()
    this.commentService = new CommentService()
    this.validate = new Validate()
    this.authenticated = new Authenticated()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.COMMENT_CREATE}`,
      this.authenticated.verifyTokenAndAuthorization,
      // validationMiddleware(this.validate.createComment),
      this.createComment,
    )

    this.router.post(
      `${this.path}${ConstantAPI.COMMENT_UPDATE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateComment,
    )
    this.router.get(
      `${this.path}${ConstantAPI.COMMENT_GET}`,
      [this.queryMiddleware.run()],
      this.getComment,
    )
    // this.router.delete(
    //     `${this.path}${ConstantAPI.BLOG_DELETE}`,
    //     this.authenticated.verifyTokenAndAuthorization,
    //     this.deleteBlog,
    // )

    // this.router.get(
    //     `${this.path}${ConstantAPI.BLOG_GET_ALL}`,
    //     [this.queryMiddleware.run()],
    //     this.getAllBlogs,
    // )
  }

  private createComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const { user } = req
      data.userId = user.id
      const comment = await this.commentService.createComment(data)
      return res.status(ConstantHttpCode.CREATED).json({
        status: {
          code: ConstantHttpCode.CREATED,
          msg: ConstantHttpReason.CREATED,
        },
        msg: ConstantMessage.COMMENT_CREATE_SUCCESS,
        data: comment,
      })
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.COMMENT_NOT_CREATE,
          error,
        ),
      )
    }
  }

  private getComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Comment | any> => {
    try {
      const { id } = req.params
      const comment = await this.commentService.findById(id)
      return res.status(ConstantHttpCode.CREATED).json({
        status: {
          code: ConstantHttpCode.CREATED,
          msg: ConstantHttpReason.CREATED,
        },
        msg: ConstantMessage.COMMENT_FOUND,
        data: { comment },
      })
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.COMMENT_NOT_FOUND,
          error,
        ),
      )
    }
  }

  // private deleteBlog = async (
  //     req: Request,
  //     res: Response,
  //     next: NextFunction,
  // ): Promise<Response | any> => {
  //     try {
  //         const { id } = req.params
  //         const deleteBlog = await this.blogService.deleteBlog(id)
  //         if (!deleteBlog) {
  //             return next(
  //                 new HttpException(
  //                     ConstantHttpCode.BAD_REQUEST,
  //                     ConstantHttpReason.BAD_REQUEST,
  //                     ConstantMessage.BLOG_NOT_DELETE,
  //                 ),
  //             )
  //         }
  //         return res.status(ConstantHttpCode.OK).json({
  //             status: {
  //                 code: ConstantHttpCode.OK,
  //                 msg: ConstantHttpReason.OK,
  //             },
  //             msg: ConstantMessage.BLOG_DELETE_SUCCESS,
  //         })
  //     } catch (err: any) {
  //         next(
  //             new HttpException(
  //                 ConstantHttpCode.INTERNAL_SERVER_ERROR,
  //                 ConstantHttpReason.INTERNAL_SERVER_ERROR,
  //                 err?.message,
  //             ),
  //         )
  //     }
  // }

  // private getAllBlogs = async (
  //     _req: Request,
  //     res: Response,
  //     next: NextFunction,
  // ): Promise<Response | void> => {
  //     try {
  //         const { queryInfo } = _req
  //         const blogs = await this.blogService.findAll(queryInfo)
  //         if (!blogs || blogs.rows.lenght == 0) {
  //             return next(
  //                 new HttpException(
  //                     ConstantHttpCode.NOT_FOUND,
  //                     ConstantHttpReason.NOT_FOUND,
  //                     ConstantMessage.USER_NOT_FOUND,
  //                 ),
  //             )
  //         }
  //         this.baseController.onSuccessAsList(res, blogs, undefined, queryInfo)
  //     } catch (err: any) {
  //         next(
  //             new HttpException(
  //                 ConstantHttpCode.INTERNAL_SERVER_ERROR,
  //                 ConstantHttpReason.INTERNAL_SERVER_ERROR,
  //                 err?.message,
  //             ),
  //         )
  //     }
  // }

  private updateComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { content } = req.body
      const { id } = req.params

      const comment = await this.commentService.findById(id)

      if (!comment) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.COMMENT_NOT_FOUND,
          ),
        )
      }
      if (comment.content === content) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.COMMENT_CONTENT_NOT_CHANGE,
          ),
        )
      }

      const updateContent = await this.commentService.updateContent(id, content)
      if (!updateContent) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.COMMENT_CONTENT_NOT_CHANGE,
          ),
        )
      }
      logger.info(`comment ${comment.content} updated`)

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.COMMENT_CONTENT_CHANGE_SUCCESS,
        data: {
          comment: updateContent,
        },
      })
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

export default CommentController
