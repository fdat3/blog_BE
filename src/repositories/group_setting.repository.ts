import { sequelize } from '@/config/sql.config'
import logger from '@/utils/logger.util'
import { GroupSetting } from '@/models/pg'

class GroupSettingRepository {
  private model

  constructor() {
    this.model = GroupSetting
  }

  public async getSettings(groupId: uuid): Promise<GroupSetting | null> {
    try {
      return this.model.findOne({
        where: {
          groupId,
        },
      })
    } catch (err) {
      logger.error('Cannot get Group setting')
      logger.error(err)
      throw new Error('Cannot get group setting')
      return null
    }
  }

  public async updateSettings(groupId: uuid, data: any): Promise<GroupSetting> {
    try {
      const groupSetting = await this.getSettings(groupId)

      if (!groupSetting) throw new Error('Cannot find group setting')
      return sequelize.transaction(async (transaction) => {
        const [, results] = await GroupSetting.update(
          {
            ...data,
          },
          {
            where: {
              groupId,
            },
            returning: true,
            transaction,
          },
        )

        return results[0]
      })
    } catch (err) {
      logger.error('Cannot update group setting')
      logger.error(err)
      throw new Error('Cannot update group setting')
    }
  }
}

export default GroupSettingRepository
