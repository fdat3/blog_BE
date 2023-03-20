import { sequelize } from '@/config/sql.config'
import baseController from '@/controllers/base.controller'

import { ICrudOption } from '@/interfaces/controller.interface'
import { Poll } from '@/models/pg'
import logger from '@/utils/logger.util'

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
      const result = await this.model.findOne(
        baseController.applyFindOptions(queryInfo),
      )
      return result
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
}

export default PollRepository
