import baseController from '@/controllers/base.controller'
import { ICrudOption } from '@/interfaces/controller.interface'
import { PollCategory } from './../models/pg/PollCategory'
import { GetListRepository } from '@/interfaces/base.interface'
import logger from '@/utils/logger.util'
import { sequelize } from '@/config/sql.config'
import { Poll } from '@/models/pg'
class PollCategoryRepository {
  private model: typeof PollCategory

  constructor() {
    this.model = PollCategory
  }

  // Find And Count All
  async findAll(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<PollCategory>> {
    try {
      return this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async findOne(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<PollCategory | null> {
    try {
      return this.model.findByPk(id, baseController.applyFindOptions(queryInfo))
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async update(id: uuid, data: PollCategory): Promise<PollCategory | null> {
    try {
      const result = await this.model.update(data, { where: { id } })
      return result[0] === 1 ? data : null
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async create(data: PollCategory): Promise<PollCategory> {
    try {
      const result = await this.model.create(data)
      return result
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async delete(id: uuid): Promise<number> {
    try {
      return sequelize.transaction(async (transaction) => {
        const result = await this.model.destroy({ where: { id }, transaction })
        await Poll.update(
          {
            categoryId: null,
          },
          {
            where: {
              categoryId: id,
            },
            transaction,
          },
        )
        return result
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default PollCategoryRepository
