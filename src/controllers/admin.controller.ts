import ConstantAPI from '@/constants/api.constant'
import adminUserController from '@/controllers/admin/admin_user.controller'
import Controller from '@/interfaces/controller.interface'
import Authenticated from '@/middlewares/authenticated.middleware'
import { verifyToken } from '@/validations/token.validation'
import { Router } from 'express'
import adminPollCategoryController from './admin/admin_poll_category.controller'
import adminGroupController from './admin/admin_group.controller'
import adminPollController from './admin/admin_poll.controller'

class AdminController implements Controller {
  public router: Router
  public path: string

  private authenticated: Authenticated

  constructor() {
    this.router = Router()
    this.path = ConstantAPI.ADMIN
    this.authenticated = new Authenticated()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.use(
      `${this.path}${ConstantAPI.ADMIN_USER}`,
      [verifyToken, this.authenticated.verifyTokenAndAdmin],
      adminUserController.router,
    )

    this.router.use(
      `${this.path}${ConstantAPI.ADMIN_POLL_CATEGORY}`,
      [verifyToken, this.authenticated.verifyTokenAndAdmin],
      adminPollCategoryController.router,
    )

    this.router.use(
      `${this.path}${ConstantAPI.ADMIN_GROUP}`,
      [verifyToken, this.authenticated.verifyTokenAndAdmin],
      adminGroupController.router,
    )

    this.router.use(
      `${this.path}${ConstantAPI.ADMIN_POLL}`,
      [verifyToken, this.authenticated.verifyTokenAndAdmin],
      adminPollController.router,
    )
  }
}

export default AdminController
