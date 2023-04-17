import { sequelize } from '@/config/sql.config'
import Message from '@/constants/message.constant'
import BaseController from '@/controllers/base.controller'
import { ICrudOption } from '@/interfaces/controller.interface'
import { Policy } from '@/models/pg'
import logger from '@/utils/logger.util'
import { GetListRepository } from '@/interfaces/base.interface'

class PolicyRepository {
  private model = Policy

  public async create(data: any): Promise<Policy | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        return this.model.create(data, { transaction })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async findOne(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<Policy | null> {
    try {
      return this.model.findByPk(id, BaseController.applyFindOptions(queryInfo))
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Policy>> {
    try {
      return this.model.findAndCountAll(
        BaseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async update(id: uuid, data: Policy): Promise<Policy | null> {
    try {
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then(async (policy) => {
            if (!policy) throw Message.POLICY_NOT_FOUND
            await policy.update({ ...data }, { transaction })
          })
          .catch((err) => {
            throw err
          })
      })

      return await this.model.findByPk(id)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async delete(id: uuid): Promise<{ isSuccess: boolean }> {
    try {
      let isSuccess: boolean = false
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then(async (policy) => {
            if (!policy) throw Message.POLICY_NOT_FOUND
            await policy.destroy({ transaction })
            isSuccess = true
          })
          .catch((err) => {
            throw err
          })
      })

      return {
        isSuccess,
      }
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default PolicyRepository
