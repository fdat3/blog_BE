import { sequelize } from '@/config/sql.config'
import { PollVotes } from '@/models/pg'
import { TPollVoteRepository } from '../types/poll.type'

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
}

export default PollVoteRepository
