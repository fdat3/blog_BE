import baseController from '@/controllers/base.controller'
import { sequelize } from '@/config/sql.config'
import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import { Transaction } from '@/models/pg'
import logger from '@/utils/logger.util'

class TransactionRepository {
  private model = Transaction

  public async create(data: any): Promise<Transaction | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        return await this.model.create(data, { transaction })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async getList(
    queryInfo: ICrudOption,
  ): Promise<GetListRepository<Transaction>> {
    try {
      return await this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async getItem(
    id: uuid,
    queryInfo: ICrudOption,
  ): Promise<Transaction | null> {
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
}

export default TransactionRepository
