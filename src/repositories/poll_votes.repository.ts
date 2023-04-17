import { sequelize } from '@/config/sql.config'
import { PollVotes } from '@/models/pg'
import logger from '@/utils/logger.util'

class PollVotesRepository {
  public model = PollVotes

  public async create(data: any): Promise<PollVotes | null> {
    try {
      return await this.model.create(data)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public static async countAnyVoteByPoll(pollId: uuid): Promise<number> {
    try {
      return await PollVotes.count({
        where: {
          pollId,
        },
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async countVoteByEachAnswerInPoll(pollId: uuid): Promise<any> {
    try {
      return await sequelize.query(`
        SELECT answer_id, COUNT(*) as count
        FROM poll_votes
        WHERE pollId = '${pollId}'
        AND deleted_at IS NULL
        GROUP BY answerId
      `)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default PollVotesRepository
