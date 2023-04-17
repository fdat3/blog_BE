import { GroupActivity } from '@/models/pg/GroupActivity'
import { sequelize } from '@/config/sql.config'
import logger from '@/utils/logger.util'

class GroupActivityRepository {
  private model = GroupActivity

  public async create(data: GroupActivity): Promise<GroupActivity> {
    try {
      return sequelize.transaction(async (transaction) => {
        return this.model.create(data, {
          transaction,
        })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default GroupActivityRepository
