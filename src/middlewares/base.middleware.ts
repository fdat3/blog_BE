import {Request, Response, NextFunction} from 'express'

class BaseMiddleware {
  onError(res: Response, err: any) {
    if(!err.options) {
      res.status(err.options.code).json(err.options)
    } else {
      res.status(err.options.code).json(err.options)
    }
  }

  async use(req: Request, res: Response, next: NextFunction, option?: any) {
    if (!option) {
      next()
    }
    next()
  }

  run(option?: any) {
    return (req: Request, res: Response, next: NextFunction) => this.use
      .bind(this)(req, res, next, option)
      .catch((error: any) => {
        this.onError(res, error)
      })
  }
}

export default BaseMiddleware