import { Router, Request, Response, NextFunction } from 'express'

import AuthService from '@/services/auth.service'
import Controller from '@/interfaces/controller.interface'

import Validate from '@/validations/user.validation'
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
import { SNSEnum } from '@/enums/auth.enum'

class AuthController implements Controller {
  public path: string
  public router: Router
  private authService: AuthService
  private validate: Validate

  constructor() {
    this.path = `${ConstantAPI.AUTH}`
    this.router = Router()
    this.authService = new AuthService()
    this.validate = new Validate()

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

    this.router.post(
      `${this.path}${ConstantAPI.AUTH_KAKAO}`,
      validationMiddleware(this.validate.sns),
      this.kakaoLogin,
    )
    this.router.post(
      `${this.path}${ConstantAPI.AUTH_NAVER}`,
      validationMiddleware(this.validate.sns),
      this.naverLogin,
    )
    this.router.post(
      `${this.path}${ConstantAPI.AUTH_FACEBOOK}`,
      validationMiddleware(this.validate.sns),
      this.facebookLogin,
    )
    this.router.post(
      `${this.path}${ConstantAPI.AUTH_GOOGLE}`,
      validationMiddleware(this.validate.sns),
      this.googleLogin,
    )
    this.router.post(
      `${this.path}${ConstantAPI.AUTH_APPLE}`,
      validationMiddleware(this.validate.sns),
      this.appleLogin,
    )
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { username, fullname, email, password, phone, device } = req.body

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

      const user = await this.authService.createUser(newUserData, device)
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
      console.log(err)
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
      const { email, password, device } = req.body

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

      const user = await this.authService.findByEmailWithPassword(email)
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

      // TODO: Create or update device session
      console.log(device)

      const accessToken = await this.authService.generateAccessToken(
        user.id,
        user.isAdmin,
      )
      logger.info(`accessToken: ${accessToken}`)

      const newUser = { ...user }

      delete newUser.password

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: newUser,
          accessToken,
        },
      })
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

  private facebookLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.authService.snsLogin(req.body, SNSEnum.FACEBOOK)

      const accessToken = await this.authService.generateAccessToken(
        user.id,
        user.isAdmin,
      )
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: user,
          accessToken,
        },
      })
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
  private kakaoLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.authService.snsLogin(req.body, SNSEnum.KAKAO)

      const accessToken = await this.authService.generateAccessToken(
        user.id,
        user.isAdmin,
      )
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: user,
          accessToken,
        },
      })
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
  private naverLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.authService.snsLogin(req.body, SNSEnum.NAVER)

      const accessToken = await this.authService.generateAccessToken(
        user.id,
        user.isAdmin,
      )
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: user,
          accessToken,
        },
      })
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
  private googleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.authService.snsLogin(req.body, SNSEnum.GOOGLE)

      const accessToken = await this.authService.generateAccessToken(
        user.id,
        user.isAdmin,
      )
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: user,
          accessToken,
        },
      })
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
  private appleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.authService.snsLogin(req.body, SNSEnum.APPLE)

      const accessToken = await this.authService.generateAccessToken(
        user.id,
        user.isAdmin,
      )
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: user,
          accessToken,
        },
      })
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
