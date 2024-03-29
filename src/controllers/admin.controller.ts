// import ConstantAPI from '@/constants/api.constant'
// import adminUserController from '@/controllers/admin/admin_user.controller'
// import Controller from '@/interfaces/controller.interface'
// import Authenticated from '@/middlewares/authenticated.middleware'
// import { verifyToken } from '@/validations/token.validation'
// import { Router } from 'express'

// class AdminController implements Controller {
//   public router: Router
//   public path: string

//   private authenticated: Authenticated

//   constructor() {
//     this.router = Router()
//     this.path = ConstantAPI.ADMIN
//     this.authenticated = new Authenticated()
//     this.initialiseRoutes()
//   }

//   private initialiseRoutes(): void {
//     this.router.use(
//       `${this.path}${ConstantAPI.ADMIN_USER}`,
//       [verifyToken, this.authenticated.verifyTokenAndAdmin],
//       adminUserController.router,
//     )
//   }
// }

// export default AdminController
