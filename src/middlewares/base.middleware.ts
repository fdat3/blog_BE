import { Response, NextFunction } from 'express'
import { Request } from '@/interfaces/controller.interface'

class BaseMiddleware {
  public onError(res: Response, err: any): void {
    if (!err.options) {
      res.status(err.options.code).json(err.options)
    } else {
      res.status(err.options.code).json(err.options)
    }
  }

  protected async use(
    req: Request,
    res: Response,
    next: NextFunction,
    option?: any,
  ): Promise<any> {
    if (!option) {
      return next()
    }
    return next()
  }

  run(option?: any): any {
    return (req: Request, res: Response, next: NextFunction): any =>
      this.use
        .bind(this)(req, res, next, option)
        .catch((error: any) => {
          this.onError(res, error)
        })
  }
}

export default BaseMiddleware
