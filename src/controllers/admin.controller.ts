import { Router } from 'express'
import ConstantAPI from '@/constants/api.constant'
import Controller from '@/interfaces/controller.interface'
import AuthService from '@/services/auth.service'
import Validate from '@/validations/user.validation'
import Authenticated from '@/middlewares/authenticated.middleware'
import adminUserController from '@/controllers/admin/admin_user.controller'
import { verifyToken } from '@/validations/token.validation'

class AdminController implements Controller {
  public router: Router
  public path: string
  private authService: AuthService
  private validate: Validate
  private authenticated: Authenticated

  constructor() {
    this.router = Router()
    this.path = ConstantAPI.ADMIN
    this.authService = new AuthService()
    this.validate = new Validate()
    this.authenticated = new Authenticated()
    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.use(
      `${this.path}${ConstantAPI.ADMIN_USER}`,
      [verifyToken, this.authenticated.verifyTokenAndAdmin],
      adminUserController.router,
    )
  }
}

export default AdminController
