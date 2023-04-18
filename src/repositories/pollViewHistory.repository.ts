import logger from '@/utils/logger.util'
import { PollViewHistory } from '@/models/pg'
import type { PollViewHistory as PollViewHistoryType } from '@/models/pg'
import { sequelize } from '@/config/sql.config'
class PollViewHistoryRepository {
  public model = PollViewHistory

  public async create(data: PollViewHistoryType): Promise<void> {
    try {
      sequelize.transaction(async (transaction) => {
        await this.model.findOrCreate({
          where: {
            ...data,
          },
          defaults: {
            ...data,
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
