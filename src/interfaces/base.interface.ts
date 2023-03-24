import { Model } from 'sequelize'

export interface GetListRepository<T extends Model> {
  rows: T[]
  count: number
}
