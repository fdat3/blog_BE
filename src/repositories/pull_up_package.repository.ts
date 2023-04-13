import baseController from '@/controllers/base.controller'
import { sequelize } from '@/config/sql.config'
import { GetListRepository } from '@/interfaces/base.interface'
import { PollUpPackage } from '@/models/pg'
import logger from '@/utils/logger.util'
import { ICrudOption } from '@/interfaces/controller.interface'

class PollUpPackageRepository {
  private model = PollUpPackage

  async create(pollUpPackage: PollUpPackage): Promise<PollUpPackage> {
    try {
      return sequelize.transaction(async (transaction) => {
        return await this.model.create(pollUpPackage, { transaction })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async update(
    id: uuid,
    pollUpPackageData: PollUpPackage,
  ): Promise<PollUpPackage | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        const pollUpPackage = await this.model.findByPk(id, { transaction })
        if (pollUpPackage) {
          await pollUpPackage.update(pollUpPackageData, { transaction })
        }
        return pollUpPackage
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async getList(
    queryInfo: ICrudOption,
  ): Promise<GetListRepository<PollUpPackage>> {
    try {
      return await this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async getItem(
    id: uuid,
    queryInfo: ICrudOption,
  ): Promise<PollUpPackage | null> {
    try {
      return await this.model.findByPk(
        id,
        baseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async setActive(id: uuid): Promise<PollUpPackage | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        const pollUpPackage = await this.model.findByPk(id, { transaction })
        if (pollUpPackage) {
          pollUpPackage.isActive = true
          await pollUpPackage.save({ transaction })
        }
        return pollUpPackage
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async setInActive(id: uuid): Promise<PollUpPackage | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        const pollUpPackage = await this.model.findByPk(id, { transaction })
        if (pollUpPackage) {
          pollUpPackage.isActive = false
          await pollUpPackage.save({ transaction })
        }
        return pollUpPackage
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default PollUpPackageRepository
