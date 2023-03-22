import { NextFunction, Router } from 'express'
import Controller, {
  Request,
  Response,
} from '@/interfaces/controller.interface'
import HttpException from '@/utils/exceptions/http.exceptions'
import ConstantAPI from '@/constants/api.constant'
// message constant
// import ConstantMessage from '@/constants/message.constant'
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'
// import logger from '@/utils/logger.util'
import BaseController from './base.controller'
import ConstantMessage from '@/constants/message.constant'
import Authenticated from '@/middlewares/authenticated.middleware'
import { verifyToken } from '@/validations/token.validation'
import GroupSettingService from '@/services/group_setting.service'

class GroupSettingController implements Controller {
  public path: string
  public router: Router
  private baseController: BaseController
  private service: GroupSettingService
  private authenticated = new Authenticated()

  constructor() {
    this.path = ConstantAPI.GROUP_SETTING
    this.router = Router()
    this.baseController = new BaseController()
    this.service = new GroupSettingService()
    this.authenticated = new Authenticated()

    this.authenticationForThisRoute()
    this.initialiseRoutes()
  }

  private authenticationForThisRoute(): void {
    this.router.use(verifyToken)
  }

  private initialiseRoutes(): void {
    this.router.get(
      `${this.path}${ConstantAPI.GROUP_SETTING_GET}`,
      this.getSettings,
    )
    this.router.put(
      `${this.path}${ConstantAPI.GROUP_SETTING_UPDATE}`,
      this.updateSettings,
    )
  }

  private getSettings = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const result = await this.service.getSettings(id)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      console.error(err)
      next(
        new HttpException(
          ConstantHttpCode.NOT_FOUND,
          ConstantHttpReason.NOT_FOUND,
          ConstantMessage.NOT_FOUND,
        ),
      )
    }
  }

  private updateSettings = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    try {
      const { id } = req.params
      const data = req.body
      const result = await this.service.updateSettings(id, data)
      this.baseController.onSuccess(res, result)
    } catch (err) {
      console.error(err)
      next(
        new HttpException(
          ConstantHttpCode.NOT_FOUND,
          ConstantHttpReason.NOT_FOUND,
          ConstantMessage.NOT_FOUND,
        ),
      )
    }
  }
}

export default GroupSettingController
