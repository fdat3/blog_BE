import { NextFunction, Request, Response } from 'express'
import { camelCase } from 'lodash'

class CamelCaseMiddleware {
  public static convertCamelCase(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (req.body && typeof req.body === 'object') {
      const newBody = new Map()
      Object.keys(req.body).forEach((key: string): void => {
        newBody.set(camelCase(key), req.body[key])
      })
      req.body = Object.fromEntries(newBody)
    }
    next()
  }
}

export default CamelCaseMiddleware
