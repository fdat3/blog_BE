import logger from '@/utils/logger.util'
import { PollViewHistory } from '@/models/pg'
import { sequelize } from '@/config/sql.config'
class PollViewHistoryRepository {
  public model = PollViewHistory

  public async create(pollId: uuid, userId?: uuid): Promise<void> {
    try {
      sequelize.transaction(async (transaction) => {
        await this.model.findOrCreate({
          where: {
            userId,
            pollId,
          },
          defaults: {
            userId,
            pollId,
          },
          transaction,
        })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default PollViewHistoryRepository
