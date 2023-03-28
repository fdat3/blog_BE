import { UserDeviceSession } from '@/models/pg'
import { sequelize } from '@/config/sql.config'
import logger from '@/utils/logger.util'

class UserDeviceSessionRepository {
  private model = UserDeviceSession

  constructor() {
    this.model = UserDeviceSession
  }

  public async findDeviceExisted(
    hash: string,
    userId: uuid,
  ): Promise<UserDeviceSession | null> {
    const userDevice = await this.model.findOne({
      where: {
        deviceId: hash,
        userId,
      },
    })

    return userDevice
  }

  public async createNewDevice(
    data: UserDeviceSession,
  ): Promise<UserDeviceSession> {
    logger.warn({ data })
    try {
      return sequelize.transaction(async (transaction) => {
        return await this.model.create(data, {
          transaction,
        })
      })
    } catch (err) {
      logger.error('Cannot create new Device')
      logger.error(err)
      throw err
    }
  }

  public async updateIpAddress(
    device: UserDeviceSession,
    ip: string,
  ): Promise<UserDeviceSession> {
    try {
      return sequelize.transaction(async (transaction) => {
        await device.update(
          {
            ipAddress: ip,
          },
          {
            transaction,
          },
        )

        return device
      })
    } catch (err) {
      logger.error('Cannot create new Device')
      logger.error(err)
      throw err
    }
  }
}

export default UserDeviceSessionRepository
