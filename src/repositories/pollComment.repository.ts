import { sequelize } from '@/config/sql.config'
import { GetListRepository } from '@/interfaces/base.interface'
import { PollComment } from '@/models/pg'
import logger from '@/utils/logger.util'
import { Includeable } from 'sequelize'

class PollCommentRepository {
  public model = PollComment
  public static readonly DEFAULT_INCLUDES: Includeable = {
    all: true,
    nested: true,
  }

  public async create(pollComment: PollComment): Promise<any> {
    try {
      return sequelize.transaction(async (transaction) => {
        return this.model.create(pollComment, {
          include: PollCommentRepository.DEFAULT_INCLUDES,
          transaction,
        })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async update(id: uuid, data: PollComment): Promise<any> {
    try {
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then(async (pollComment) => {
            if (!pollComment) throw new Error('PollComment not found')
            await pollComment.update(data, { transaction })
          })
          .catch((err) => {
            throw err
          })
      })
      return this.model.findByPk(id)
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
