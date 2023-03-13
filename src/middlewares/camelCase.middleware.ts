import { Request, Response, NextFunction } from 'express'
import { camelCase } from 'lodash'
import logger from '@/utils/logger.util'
class CamelCaseMiddleware {
  public static convertCamelCase(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    logger.info({})
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