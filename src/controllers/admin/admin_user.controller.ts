import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'

import { NextFunction, Router } from 'express'
import BaseController from '@/controllers/base.controller'
import QueryMiddleware from '@/middlewares/quey.middleware'
import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
import ConstantMessage from '@/constants/message.constant'
import UserService from '@/services/user.service'
import ConstantAPI from '@/constants/api.constant'
import logger from '@/utils/logger.util'
import Validate from '@/validations/user.validation'
import AuthService from '@/services/auth.service'
import validationMiddleware from '@/middlewares/validation.middleware'

export class AdminUserController implements Controller {
  path: string
  router: Router
  private baseController: BaseController
  private queryMiddleware: QueryMiddleware
  private userService: UserService
  private validate: Validate
  private authService: AuthService

  constructor() {
    this.path = '/'
    this.router = Router()
    this.baseController = new BaseController()
    this.queryMiddleware = new QueryMiddleware()
    this.userService = new UserService()
    this.validate = new Validate()
    this.authService = new AuthService()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.get(this.path, [this.queryMiddleware.run()], this.getList)
    this.router.post(
      ConstantAPI.ADMIN_USER_ADD,
      [validationMiddleware(this.validate.register)],
      this.create,
    )

    this.router.put(`${ConstantAPI.ADMIN_USER_EDIT}`, this.update)
    this.router.delete(`${ConstantAPI.ADMIN_USER_DELETE}`, this.delete)
  }

  private getList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { queryInfo } = req
      const users = await this.userService.findAll(queryInfo)
      if (!users || users.rows.length == 0) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }
      this.baseController.onSuccessAsList(res, users, undefined, queryInfo)
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

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { username, fullname, email, password, phone } = req.body

      const usernameValidated = this.validate.validateUsername(username)
      if (!usernameValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.USERNAME_NOT_VALID,
          ),
        )
      }
      logger.info(`username ${username} is valid`)

      const fullnameValidated = this.validate.validateName(fullname)
      if (!fullnameValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.FULLNAME_NOT_VALID,
          ),
        )
      }
      logger.info(`fullname ${fullname} is valid`)

      const emailValidated = this.validate.validateEmail(email)
      if (!emailValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.EMAIL_NOT_VALID,
          ),
        )
      }
      logger.info(`email ${email} is valid`)

      const passwordValidated = this.validate.validatePassword(password)
      if (!passwordValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }
      logger.info(`password ${password} is valid`)

      const phoneValidated = this.validate.validatePhone(phone)
      if (!phoneValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.PHONE_NOT_VALID,
          ),
        )
      }
      logger.info(`phone ${phone} is valid`)

      const usernameCheck = await this.authService.findByUsername(username)
      if (usernameCheck) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.USERNAME_EXIST,
          ),
        )
      }

      const emailCheck = await this.authService.findByEmail(email)
      if (emailCheck) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.EMAIL_EXIST,
          ),
        )
      }

      const phoneCheck = await this.authService.findByPhone(phone)
      if (phoneCheck) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.PHONE_EXIST,
          ),
        )
      }

      const newUserData = {
        username,
        fullname,
        email,
        password,
        phone,
      }

      const user = await this.authService.createUser(newUserData)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.CONFLICT,
            ConstantHttpReason.CONFLICT,
            ConstantMessage.USER_NOT_CREATE,
          ),
        )
      }

      const newUser = { ...user }

      delete newUser.password

      return res.status(ConstantHttpCode.CREATED).json({
        status: {
          code: ConstantHttpCode.CREATED,
          msg: ConstantHttpReason.CREATED,
        },
        msg: ConstantMessage.USER_CREATE_SUCCESS,
        data: newUser,
      })
    } catch (err: any) {
      logger.error(err)
      return next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err.message,
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
      const { user, body } = req
      body.id = user.id
      const result = await this.userService.updateAny(body)
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.UPDATE_SUCCESSFULLY,
        data: {
          user: result,
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

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params

      const user = await this.userService.findById(id)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }

      const deletedUser = await this.userService.deleteUser(id)
      if (!deletedUser) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.USER_NOT_DELETE,
          ),
        )
      }

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_DELETE_SUCCESS,
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

const adminUserController: AdminUserController = new AdminUserController()

export default adminUserController
