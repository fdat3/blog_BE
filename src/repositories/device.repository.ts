import { UserDeviceSession } from '@/models/pg'
import { ICrudOption } from '@/interfaces/controller.interface'
import { GetListRepository } from '@/interfaces/base.interface'
import baseController from '@/controllers/base.controller'
import logger from '@/utils/logger.util'

class DeviceRepository {
  private model

  constructor() {
    this.model = UserDeviceSession
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<UserDeviceSession>> {
    try {
      return await this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error('Cannot get list queryInfo')
      logger.error(err)
      throw err
    }
  }

  public async getItem(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<UserDeviceSession | null> {
    try {
      return await this.model.findByPk(
        id,
        baseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error('Cannot get list queryInfo')
      logger.error(err)
      throw err
    }
  }

  public async delete(id: uuid): Promise<number> {
    try {
      return await this.model.destroy({
        where: {
          id,
        },
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default DeviceRepository
