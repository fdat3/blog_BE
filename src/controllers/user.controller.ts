import { NextFunction, Router } from 'express'

import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'

import UserService from '@/services/user.service'
import Validate from '@/validations/user.validation'

import Authenticated from '@/middlewares/authenticated.middleware'
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
import QueryMiddleware from '@/middlewares/quey.middleware'
import BaseController from '@/controllers/base.controller'
import { verifyToken } from '@/validations/token.validation'

class UserController implements Controller {
  public path: string
  public router: Router
  private userService: UserService
  private authenticated: Authenticated
  private validate: Validate
  private queryMiddleware: QueryMiddleware
  private baseController: BaseController

  constructor() {
    this.path = `${ConstantAPI.USERS}`
    this.router = Router()
    this.userService = new UserService()
    this.authenticated = new Authenticated()
    this.validate = new Validate()
    this.queryMiddleware = new QueryMiddleware()
    this.baseController = new BaseController()

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${ConstantAPI.USERS_CREATE}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.createUser),
      this.createUser,
    )

    this.router.post(
      `${this.path}${ConstantAPI.USER_LOGIN}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.login),
      this.userLogin,
    )

    this.router.delete(
      `${this.path}${ConstantAPI.USER_DELETE}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteUser,
    )

    this.router.post(
      `${this.path}${ConstantAPI.USER_UPDATE_FULLNAME}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.updateFullname),
      this.updateFullname,
    )

    this.router.post(
      `${this.path}${ConstantAPI.USER_UPDATE_DOB}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.updateDob),
      this.updateDob,
    )

    this.router.post(
      `${this.path}${ConstantAPI.USER_UPDATE_EMAIL}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.updateEmail),
      this.updateEmail,
    )

    this.router.post(
      `${this.path}${ConstantAPI.USER_UPDATE_PASSWORD}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.updatePassword),
      this.updatePassword,
    )

    this.router.get(
      `${this.path}${ConstantAPI.USER_GET}`,
      verifyToken,
      this.getUser,
    )

    this.router.get(
      `${this.path}${ConstantAPI.USER_GET_ALL}`,
      [this.queryMiddleware.run()],
      this.getAllUsers,
    )
  }
  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { fullname, email, password } = req.body

      const newUserData = {
        fullname,
        email,
        password,
      }
      const user = await this.userService.createUser(newUserData)
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
    } catch (err) {
      logger.error(err)
      next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err || ConstantMessage.USER_NOT_CREATE,
          err,
        ),
      )
    }
  }

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.params
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

  private updateFullname = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { fullname, password } = req.body
      const { id } = req.params

      const user = await this.userService.findByIdWithPassword(id)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }
      logger.info(`fullname ${user.fullname} found`)

      const isFullnameInvalid = this.validate.validateFullname(fullname)
      if (!isFullnameInvalid) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.FULLNAME_NOT_VALID,
          ),
        )
      }
      logger.info(`fullname ${fullname} is valid`)

      const isPasswordValid = this.validate.validatePassword(password)
      if (!isPasswordValid) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }
      logger.info(`password ${password} is valid`)

      const isMatch = this.userService.comparePassword(password, user.password)
      if (!isMatch) {
        return next(
          new HttpException(
            ConstantHttpCode.UNAUTHORIZED,
            ConstantHttpReason.UNAUTHORIZED,
            ConstantMessage.PASSWORD_NOT_MATCH,
          ),
        )
      }
      logger.info(`password ${password} match`)

      const fullnameCheck = await this.userService.findByFullname(fullname)
      if (fullnameCheck) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.USERNAME_EXIST,
          ),
        )
      }

      if (user.fullname === fullname) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.FULLNAME_NOT_CHANGE,
          ),
        )
      }

      const updatedUser = await this.userService.updateFullname(id, fullname)
      if (!updatedUser) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.FULLNAME_NOT_CHANGE,
          ),
        )
      }
      logger.info(`user ${user.fullname} updated`)

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.FULLNAME_CHANGE_SUCCESS,
        data: {
          user: updatedUser,
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

  private updateDob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { password, dob } = req.body
      const { id } = req.params

      const user = await this.userService.findByIdWithPassword(id)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }

      if (user.dob === dob) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.DOB_NOT_CHANGE,
          ),
        )
      }

      const isMatch = this.userService.comparePassword(password, user.password)
      if (!isMatch) {
        return next(
          new HttpException(
            ConstantHttpCode.UNAUTHORIZED,
            ConstantHttpReason.UNAUTHORIZED,
            ConstantMessage.PASSWORD_NOT_MATCH,
          ),
        )
      }

      const updatedUser = await this.userService.updateDob(id, dob)
      if (!updatedUser) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.DOB_NOT_CHANGE,
          ),
        )
      }
      delete updatedUser.password
      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.DOB_CHANGE_SUCCESS,
        data: {
          user: updatedUser,
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

  private updateEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body
      const { id } = req.params

      const user = await this.userService.findByIdWithPassword(id)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }

      const isEmailValid = this.validate.validateEmail(email)
      if (!isEmailValid) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.EMAIL_NOT_VALID,
          ),
        )
      }

      const isPasswordValid = this.validate.validatePassword(password)
      if (!isPasswordValid) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }

      if (user.email === email) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.EMAIL_NOT_CHANGE,
          ),
        )
      }

      const emailCheck = await this.userService.findByEmail(email)
      if (emailCheck) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.EMAIL_EXIST,
          ),
        )
      }

      const isMatch = this.userService.comparePassword(password, user.password)
      if (!isMatch) {
        return next(
          new HttpException(
            ConstantHttpCode.UNAUTHORIZED,
            ConstantHttpReason.UNAUTHORIZED,
            ConstantMessage.PASSWORD_NOT_MATCH,
          ),
        )
      }

      const updatedUser = await this.userService.updateEmail(id, email)
      if (!updatedUser) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.EMAIL_NOT_CHANGE,
          ),
        )
      }

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.EMAIL_CHANGE_SUCCESS,
        data: {
          user: updatedUser,
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

  private updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body
      const { id } = req.params

      if (newPassword !== confirmPassword) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.PASSWORD_NOT_MATCH,
          ),
        )
      }

      const user = await this.userService.findByIdWithPassword(id)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.NOT_FOUND,
            ConstantHttpReason.NOT_FOUND,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }

      const isOldPasswordValid = this.validate.validatePassword(oldPassword)
      if (!isOldPasswordValid) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }

      const isNewPasswordValid = this.validate.validatePassword(newPassword)
      if (!isNewPasswordValid) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }

      const isConfirmPasswordValid =
        this.validate.validatePassword(confirmPassword)
      if (!isConfirmPasswordValid) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.PASSWORD_NOT_VALID,
          ),
        )
      }

      const isMatch = this.userService.comparePassword(
        oldPassword,
        user.password,
      )
      if (!isMatch) {
        return next(
          new HttpException(
            ConstantHttpCode.UNAUTHORIZED,
            ConstantHttpReason.UNAUTHORIZED,
            ConstantMessage.PASSWORD_NOT_MATCH,
          ),
        )
      }

      if (oldPassword === newPassword) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.PASSWORD_NOT_CHANGE,
          ),
        )
      }

      const updatedUser = await this.userService.updatePassword(id, newPassword)
      if (!updatedUser) {
        return next(
          new HttpException(
            ConstantHttpCode.BAD_REQUEST,
            ConstantHttpReason.BAD_REQUEST,
            ConstantMessage.PASSWORD_NOT_CHANGE,
          ),
        )
      }

      delete updatedUser.password

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.PASSWORD_CHANGE_SUCCESS,
        data: {
          user: updatedUser,
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

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
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

      return res.status(ConstantHttpCode.OK).json({
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_FOUND,
        data: {
          user,
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

  private getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { queryInfo } = _req
      const users = await this.userService.findAll(queryInfo)
      if (!users || users.rows.lenght == 0) {
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

  private userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { fullname, password } = req.body
      const fullnameValidated = this.validate.validateFullname(fullname)
      if (!fullnameValidated) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.FULLNAME_NOT_VALID,
          ),
        )
      }

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

      const user = await this.userService.findByFullnameWithPassword(fullname)
      if (!user) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.USER_NOT_FOUND,
          ),
        )
      }

      const isMatch = this.userService.comparePassword(password, user.password)
      if (!isMatch) {
        return next(
          new HttpException(
            ConstantHttpCode.INTERNAL_SERVER_ERROR,
            ConstantHttpReason.INTERNAL_SERVER_ERROR,
            ConstantMessage.PASSWORD_NOT_MATCH,
          ),
        )
      }

      const result = {
        status: {
          code: ConstantHttpCode.OK,
          msg: ConstantHttpReason.OK,
        },
        msg: ConstantMessage.USER_LOGIN_SUCCESS,
        data: {
          user: user,
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

export default UserController
