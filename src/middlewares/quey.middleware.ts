import { ICrudOption } from '@/interfaces/controller.interface';
import BaseMiddleware from '@/middlewares/base.middleware'
import { Request } from 'express'
import * as _ from 'lodash'

class QueryMiddleware extends BaseMiddleware {
  // async use(req: Request, res: Response, next: NextFunction){
  //
  // }

  _parseFilter(req: Request | any): any {
    let filter = req.query['filter'];
    try {
      filter = JSON.parse(filter);
    } catch (ignore) {
      filter = undefined;
    }
    return filter || {};
  }
  /**
   * Format: [[key, order], [key, order]]
   */
  _parseOrder(req: Request | any): any {
    let order = req.query['order'];
    try {
      order = JSON.parse(order);
    } catch (ignore) {
      order = undefined;
    }
    return order || [['updated_at', 'asc']];
  }
  _parseFields(req: Request | any): any {
    let fields = req.query['fields'];
    try {
      fields = JSON.parse(fields);
    } catch (ignore) {
      fields = [];
    }
    try {
      return this._parseAttribute(fields);
    } catch (err) {
      return null;
    }
  }
  _parseAttribute(attrs: any): ICrudOption {
    const attributes: any[] = [];
    const includes: any[] = [];
    let isGetAll = false;
    let isSetParanoid = false;
    let where: any = undefined;
    _.forEach(attrs, (f) => {
      if (typeof f === 'string') {
        switch (f) {
          case '$all':
            isGetAll = true;
            break;
          case '$paranoid':
            isSetParanoid = true;
            break;
          default:
            attributes.push(f);
        }
      } else if (typeof f === 'object' && !Array.isArray(f)) {
        _.forEach(
          f,
          ((value: any, name: string): void => {
            switch (name) {
              case '$filter':
                where = _.merge({}, where, value);
                break;
              default:
                includes.push({
                  [name]: value,
                });
            }
          }).bind(this)
        );
      }
    });
    const include = this._parseInclude(includes);
    const result: any = {
      include: include,
      distinct: includes ? true : false,
    };
    if (where) result.where = where;
    if (!isGetAll) {
      result.attributes = attributes;
    }
    if (isSetParanoid) {
      result.paranoid = false;
    }
    return result;
  }

  _parseInclude(includes: any): any[] {
    if (includes.length === 0) return includes;

    const associates: any[] = [];
    _.forEach(
      includes,
      ((i: any): void => {
        _.forEach(
          i,
          ((attrs: any, name: string): void => {
            const associate = Object.assign(
              {
                association: name,
              },
              this._parseAttribute(attrs)
            );
            associates.push(associate);
          }).bind(this)
        );
      }).bind(this)
    );
    return associates;
  }
}

export default QueryMiddleware