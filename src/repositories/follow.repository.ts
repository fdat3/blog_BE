import { Follow } from '@/models/pg'
import { ICrudOption } from '@/interfaces/controller.interface'
import baseController from '@/controllers/base.controller'
import { cloneDeep } from 'lodash'
import logger from '@/utils/logger.util'
import { sequelize } from '@/config/sql.config'

class FollowRepository {
  private model

  constructor() {
    this.model = Follow
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<{ rows: Follow[]; count: number }> {
    const results = await this.model.findAndCountAll(
      baseController.applyFindOptions(queryInfo),
    )
    return results
  }

  public async getFollowedList(
    userId: uuid,
    queryInfo?: ICrudOption,
  ): Promise<{ rows: Follow[]; count: number }> {
    const filter = {
      ...queryInfo?.filter,
      userId,
    }

    const newQuery = cloneDeep(queryInfo) || {}
    newQuery.filter = filter

    return this.getList(newQuery)
  }

  public async getFollowingList(
    userId: uuid,
    queryInfo?: ICrudOption,
  ): Promise<{ rows: Follow[]; count: number }> {
    const filter = {
      ...queryInfo?.filter,
      followedId: userId,
    }

    const newQuery = cloneDeep(queryInfo) || {}
    newQuery.filter = filter

    return this.getList(newQuery)
  }

  public async addFollower(
    userId: uuid,
    followedId: uuid,
  ): Promise<Follow | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        return this.model.create(
          {
            userId,
            followedId,
          },
          {
            transaction,
          },
        )
      })
    } catch (err) {
      logger.error('Cannot create follower')
      logger.error(err)
      return null
    }
  }

  public async removeFollowedItem(
    userId: uuid,
    followedId: uuid,
  ): Promise<any> {
    try {
      const result = await this.model.destroy({
        where: {
          userId,
          followedId,
        },
      })

      return result
    } catch (err) {
      logger.error('cannot remove followed user')
      logger.error(err)

      return null
    }
  }
}

export default FollowRepository
