import { Request, Response } from 'express'
import { ICrudOption } from '@/interfaces/controller.interface'
import * as _ from 'lodash'
import { FindOptions } from 'sequelize'
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

export interface TokenInfo {
  payload?: any
  role?: string
  exp?: any
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
  onError(res: ExtraResponse, error: any): void {
    if (!error.options) {
      // const err = errorService.router.somethingWentWrong()
      res.status(error.options.code).json(error.options)
    } else {
      res.status(error.options.code).json(error.options)
    }
  }

  onSuccess(res: ExtraResponse, object: any = {}, extras: any): void {
    object = object || {}
    if (Object.keys(object).length === 0) {
      res.json({
        code: 200,
      })
    } else {
      res.json({
        code: 200,
        results: Object.assign(
          {
            object,
          },
          extras,
        ),
      })
    }
  }

  onSuccessAsList(
    res: ExtraResponse,
    objects: any = [],
    extras: any = {},
    option?: ICrudOption,
  ): void {
    option = option
      ? option
      : {
          offset: 0,
          limit: 10,
        }
    if (objects.toJSON) {
      objects = objects.toJSON()
    }
    const page = _.floor((option?.offset || 0) / (option.limit || 10)) + 1
    res.json({
      code: ConstantHttpCode.OK,
      msg: ConstantHttpReason.OK,
      results: Object.assign(
        {
          objects,
        },
        extras,
      ),
      pagination: {
        current_page: page,
        next_page: page + 1,
        prev_page: page - 1,
        limit: option.limit,
      },
    })
  }

  public static applyFindOptions(
    option: ICrudOption = {},
  ): Partial<FindOptions> {
    const query: Partial<FindOptions<any> | any> = {
      where: option.filter,
      limit: option.limit,
      offset: option.offset,
      order: option.order,
      attributes: option.attributes,
      include: option.include,
      paranoid: option.paranoid,
      distinct: Array.isArray(option.include),
    }
    return query
  }
}

export default BaseController
