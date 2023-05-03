import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import Validate from '@/validations/user.validation'
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

class BlogController implements Controller {
  public path: string
  public router: Router
  private blogService: BlogService
  private validate: Validate
  private authenticated: Authenticated

  constructor() {
    this.path = `${ConstantAPI.BLOGS}`
    this.router = Router()
    this.blogService = new BlogService()
    this.validate = new Validate()
    this.authenticated = new Authenticated()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.BLOG_CREATE}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.createBlog),
      this.createBlog,
    )
  }

  private createBlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const data = req.body
      const newBlogData = data
      await this.blogService.createBlog(newBlogData)
      return res.status(ConstantHttpCode.CREATED).json({
        status: {
          code: ConstantHttpCode.CREATED,
          msg: ConstantHttpReason.CREATED,
        },
        msg: ConstantMessage.BLOG_CREATE_SUCCESS,
        data: newBlogData,
      })
    } catch (error) {
      logger.error(error)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          error || Message.BLOG_CREATE_SUCCESS,
          error,
        ),
      )
    }
  }
}

export default BlogController
