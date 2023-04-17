import { sequelize } from '@/config/sql.config'
import { GetListRepository } from '@/interfaces/base.interface'
import { PollComment } from '@/models/pg'
import type { PollComment as PollCommentType } from '@/models/pg'
import logger from '@/utils/logger.util'

class PollCommentRepository {
  public model = PollComment

  public async create(data: PollCommentType): Promise<PollComment | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        return await this.model.create(data, { transaction })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public static async countCommentsByPollId(pollId: uuid): Promise<number> {
    try {
      return await PollComment.count({
        where: {
          pollId,
        },
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  // TODO: Get Comment with recursive replying
  public static async getCommentsByPoll(
    pollId: uuid,
  ): Promise<GetListRepository<PollComment>> {
    try {
      return await PollComment.findAndCountAll({
        where: {
          pollId,
        },
        include: [
          {
            model: PollComment,
            as: 'reply',
          },
        ],
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default PollCommentRepository
