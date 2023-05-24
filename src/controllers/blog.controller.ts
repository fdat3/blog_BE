import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import Validate from '@/validations/blog.validation'
import BlogService from '@/services/blog.service'
import validationMiddleware from '@/middlewares/validation.middleware'
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

class BlogController implements Controller {
  public path: string
  public router: Router
  private blogService: BlogService
  private validate: Validate
  private authenticated: Authenticated
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController

  constructor() {
    this.path = `${ConstantAPI.BLOGS}`
    this.router = Router()
    this.blogService = new BlogService()
    this.validate = new Validate()
    this.authenticated = new Authenticated()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.BLOG_CREATE}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.createBlog),
      this.createBlog,
    )

    this.router.delete(
      `${this.path}${ConstantAPI.BLOG_DELETE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteBlog,
    )

    this.router.get(
      `${this.path}${ConstantAPI.BLOG_GET_ALL}`,
      [this.queryMiddleware.run()],
      this.getAllBlogs,
    )
    this.router.get(
      `${this.path}${ConstantAPI.BLOG_GET}`,
      [
        verifyToken,
        this.authenticated.verifyTokenAndAuthorization,
        this.queryMiddleware.run(),
      ],
      this.getBlog,
    )
    this.router.post(
      `${this.path}${ConstantAPI.BLOG_UPDATE_CONTENT}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateContent,
    )
    this.router.post(
      `${this.path}${ConstantAPI.BLOG_UPDATE_TITLE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateTitle,
    )
    this.router.post(
      `${this.path}${ConstantAPI.BLOG_FIND}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.findBlog,
    )
  }

  private createBlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const { user } = req
      data.userId = user.id
      const newBlogData = { ...data }
      const blog = await this.blogService.createBlog(newBlogData)
      return res.status(ConstantHttpCode.CREATED).json({
        status: {
          code: ConstantHttpCode.CREATED,
          msg: ConstantHttpReason.CREATED,
        },
        msg: ConstantMessage.BLOG_CREATE_SUCCESS,
        data: blog,
      })
    } catch (error) {
      logger.error(error)
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

  private deleteBlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const deleteBlog = await this.blogService.deleteBlog(id)
      if (!deleteBlog) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.BLOG_NOT_DELETE,
          ),
        )
      }
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.BLOG_DELETE_SUCCESS,
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

  private getAllBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const blogs = await this.blogService.findAll()
      if (!blogs) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }
      this.baseController.onSuccessAsList(res, blogs)
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

  private updateContent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { body } = req.body
      const { id } = req.params

      const blog = await this.blogService.findById(id)

      if (!blog) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.BLOG_NOT_FOUND,
          ),
        )
      }

      if (blog.body === body) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.BLOG_CONTENT_NOT_CHANGE,
          ),
        )
      }

      const updateBody = this.blogService.updateContent(id, body)
      if (!updateBody) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.BLOG_CONTENT_NOT_CHANGE,
          ),
        )
      }
      logger.info(`blog ${blog.body} updated`)
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.BLOG_CONTENT_CHANGE_SUCCESS,
        data: {
          blog: updateBody,
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

  private updateTitle = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { title } = req.body
      const { id } = req.params

      const blog = await this.blogService.findById(id)

      if (!blog) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.BLOG_NOT_FOUND,
          ),
        )
      }
      if (blog.title === title) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.BLOG_TITLE_NOT_CHANGE,
          ),
        )
      }

      const updatedTitle = await this.blogService.updateTitle(id, title)
      if (!updatedTitle) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.BLOG_TITLE_NOT_CHANGE,
          ),
        )
      }
      logger.info(`blog ${blog.title} updated`)

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.BLOG_TITLE_CHANGE_SUCCESS,
        data: {
          blog: updatedTitle,
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
  private getBlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.params
      const queryInfo = req.queryInfo || {}

      if (req.user) {
        queryInfo.userId = req.user.id
      }

      const { user } = req
      if (user) {
        queryInfo.user = user
      }

      const blog = await this.blogService.getBlog(id as string, queryInfo)
      if (!blog) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.BLOG_NOT_FOUND,
          ),
        )
      }

      this.baseController.onSuccess(res, blog, undefined)
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
  private findBlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Partial<Response> | void> => {
    try {
      const { keyword } = req.params
      const blog = await this.blogService.findBlog(keyword)
      if (!blog) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.BLOG_NOT_FOUND,
          ),
        )
      }
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.BLOG_FOUND,
        data: { blog },
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

export default BlogController
