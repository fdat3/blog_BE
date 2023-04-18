import { sequelize } from '@/config/sql.config'
import { PollVotes } from '@/models/pg'
import { TPollVoteRepository } from '../types/poll.type'
import logger from '@/utils/logger.util'

class PollVoteRepository {
  async createNewVote(data: TPollVoteRepository): Promise<PollVotes> {
    return sequelize.transaction(async (transaction) => {
      const result = await PollVotes.create(data, { transaction })
      return result
    })
  }

  async reVote(data: TPollVoteRepository): Promise<Partial<boolean>> {
    return sequelize.transaction(async (transaction) => {
      return await PollVotes.update(data, {
        where: {
          pollId: data.pollId,
          userId: data.userId,
        },
        transaction,
      })
        .then((result) => {
          return result[0] > 0
        })
        .catch((error) => {
          throw error
        })
    })
  }

  async unVote(data: TPollVoteRepository): Promise<Partial<boolean>> {
    return sequelize.transaction(async (transaction) => {
      return await PollVotes.destroy({
        where: {
          pollId: data.pollId,
          userId: data.userId,
        },
        transaction,
      })
        .then((result) => {
          return result > 0
        })
        .catch((error) => {
          throw error
        })
    })
  }

  // TODO: Implement this method increasePointOfPoll
  private async increasePointOfPoll(pollId: uuid): Promise<any> {
    logger.info('increasePointOfPoll')
    logger.info(pollId)
    return
  }

  // TODO: Implement this method decreasePointOfPoll
  private async decreasePointOfPoll(pollId: uuid): Promise<any> {
    logger.info('decreasePointOfPoll')
    logger.info(pollId)
    return
  }
}

export default PollVoteRepository
