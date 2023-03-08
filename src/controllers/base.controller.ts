import {Response, Request} from 'express'
import { ICrudOption } from '@/interfaces/controller.interface'
import * as _ from 'lodash'

export interface TokenInfo {
  payload?: any,
  role?: string,
  exp?: any,
  [x: string]: any
}

export interface ExtraRequest extends Request {
  queryInfo?: ICrudOption

  tokenInfo?: TokenInfo
}

export interface ExtraResponse extends Response {
  [key: string]: any
}

class BaseController {

  onError(res: ExtraResponse, error: any) {
    if (!error.options) {
      // const err = errorService.router.somethingWentWrong()
      res.status(error.options.code).json(error.options)
    } else {
      res.status(error.options.code).json(error.options)
    }
  }

  onSuccess(res: ExtraResponse, object: any = {}, extras: any) {
    object = object || {}
    if (Object.keys(object).length === 0) {
      res.json({
        code: 200
      })
    } else {
      res.json({
        code: 200,
        results: Object.assign({
          object
        }, extras)
      })
    }
  }

  onSuccessAsList(res: ExtraResponse, objects: any = [], extras: any = {}, option?: ICrudOption) {
    option = option ? option : {
      offset: 0, limit: 10
    }
    if (objects.toJSON) {
      objects = objects.toJSON()
    }
    const page = _.floor((option?.offset || 0) / (option.limit || 10)) + 1
    res.json({
      code: 200,
      results: Object.assign({
        objects
      }, extras),
      pagination: {
        'current_page': page,
        'next_page': page + 1,
        'prev_page': page - 1,
        'limit': option.limit
      }
    })


  }


}

export default BaseController