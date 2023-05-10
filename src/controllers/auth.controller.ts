import { NextFunction, Router } from 'express'

import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import AuthService from '@/services/auth.service'

import validationMiddleware from '@/middlewares/validation.middleware'
import Validate from '@/validations/user.validation'

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
// import { DateTime } from 'luxon'
import BaseController from '@/controllers/base.controller'
import * as _ from 'lodash'

class AuthController implements Controller {
  public path: string
  public router: Router
  private authService: AuthService
  private baseController: BaseController
  private validate: Validate

  constructor() {
    this.path = `${ConstantAPI.AUTH}`
    this.router = Router()
    this.authService = new AuthService()
    this.validate = new Validate()
    this.baseController = new BaseController()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.AUTH_REGISTER}`,
      validationMiddleware(this.validate.register),
      this.register,
    )

    this.router.post(
      `${this.path}${ConstantAPI.AUTH_LOGIN}`,
      validationMiddleware(this.validate.login),
      this.login,
    )
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { fullname, email, password } = req.body

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

      const newUserData = {
        fullname,
        email,
        password,
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

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { password, email } = req.body

      const passwordValidated = this.validate.validatePassword(password)
      if (!passwordValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }
      logger.info(`password ${password} is valid`)

      const emailValidated = this.validate.validateEmail(email)
      if (!emailValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.EMAIL_NOT_VALID,
          ),
        )
      }
      logger.info(`email ${email} is valid`)

      const user = await this.authService.findByEmail(email)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }

      const isMatch = this.authService.comparePassword(password, user.password)
      if (!isMatch) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.PASSWORD_NOT_MATCH,
          ),
        )
      }

      const accessToken = await this.authService.generateAccessToken(
        user.id,
        user.isAdmin,
      )
      logger.info(`accessToken: ${accessToken}`)

      const refreshToken: string = await this.authService.generateRefreshToken(
        user.id,
        user.isAdmin,
      )

      res.cookie('jwt', refreshToken)

      const newUser = _.cloneDeep(user)

      delete newUser.password

      req.session.user = newUser

      const result = {
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: newUser,
          accessToken,
          refreshToken,
        },
      }

      this.baseController.onSuccess(res, result)
    } catch (err: any) {
      return next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err.message,
        ),
      )
    }
  }
}

export default AuthController
