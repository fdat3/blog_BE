import { sequelize } from '@/config/sql.config'
import baseController from '@/controllers/base.controller'

import { ICrudOption } from '@/interfaces/controller.interface'
import { Poll } from '@/models/pg'
import logger from '@/utils/logger.util'
import { redis } from '@/config/redis.config'

class PollRepository {
  private model

  constructor() {
    this.model = Poll
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<{ rows: Partial<Poll[]>; count: number } | null> {
    try {
      return this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  public async getItem(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<Poll | null> {
    try {
      const result = await this.model.findByPk(id, {
        ...baseController.applyFindOptions(queryInfo),
      })
      return result
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async create(user: any, data: any): Promise<Poll | any> {
    try {
      return sequelize.transaction(async (transaction) => {
        const poll = await Poll.create(
          {
            ...data,
            userId: user.id,
          },
          {
            include: [
              {
                association: 'entities',
              },
              {
                association: 'answers',
              },
              {
                association: 'hashtags',
                include: [
                  {
                    association: 'hashtag',
                  },
                ],
              },
              {
                association: 'mentions',
                include: [
                  {
                    association: 'user',
                  },
                ],
              },
            ],
            transaction,
          },
        )

        return poll
      })
    } catch (error) {
      logger.error('Cannot create poll')
      logger.error(error)
      return null
    }
  }

  public async update(queryInfo?: ICrudOption): Promise<Poll | null> {
    try {
      const poll = await this.model.findOne(
        baseController.applyFindOptions(queryInfo),
      )
      return poll
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    try {
      const result = await this.model.destroy(queryInfo)
      return result
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  /**
   * This function to run every day at 12:00 AM (00:00) to get popularity of polls
   * This will get the most 3 polls with the highest popularity with counting of votes and views on each poll
   * And store this id to redis, then store to database in popularity table
   */
  public async getPopularityPolls(): Promise<Poll[] | void> {
    const redisKey = 'popularityPolls'
    const popularityPolls = await redis.get(redisKey)
    if (popularityPolls) {
      logger.info('Popularity polls already exist')
      return
    } else {
      /**
       * Finding the most 3 polls with the highest popularity with counting of votes and views on each poll
       * And store this id to redis, then store to database in popularity table
       */
      const popularityPolls = await this.model.findAll({
        where: {},
        limit: 3,
        order: [
          ['createdAt', 'DESC'],
          ['views', 'DESC'],
          ['votes', 'DESC'],
        ],
        attributes: ['id'],
      })

      console.log({ popularityPolls })

      if (popularityPolls.length > 0) {
        /**
         * set redis key
         */
        await redis.set(redisKey, JSON.stringify(popularityPolls))
      }

      return popularityPolls
    }
  }
}

export default PollRepository
