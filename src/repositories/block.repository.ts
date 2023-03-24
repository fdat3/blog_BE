import { Block } from '@/models/pg'
import { ICrudOption } from '@/interfaces/controller.interface'
import { GetListRepository } from '@/interfaces/base.interface'
import baseController from '@/controllers/base.controller'
import logger from '@/utils/logger.util'
import { sequelize } from '@/config/sql.config'

class BlockRepository {
  private model

  constructor() {
    this.model = Block
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Block> | null> {
    try {
      return this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error('Cannot get block list')
      logger.error(err)
      return null
    }
  }

  public async findOne(id: uuid): Promise<Block | null> {
    try {
      return this.model.findByPk(id)
    } catch (err) {
      logger.error('Cannot find the Block item')
      logger.error(err)
      return null
    }
  }

  public async create(blockerId: uuid, blockedId: uuid): Promise<Block | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        return await this.model.create(
          {
            blockedId,
            blockerId,
          },
          {
            transaction,
          },
        )
      })
    } catch (err) {
      return null
    }
  }

  public async delete(blockerId: uuid, blockedId: uuid): Promise<boolean> {
    try {
      let isSuccess: boolean = false

      await sequelize.transaction(async (transaction) => {
        const blockItem = await this.model.findOne({
          where: {
            blockerId,
            blockedId,
          },
        })

        if (blockItem) {
          await blockItem
            .destroy({
              transaction,
            })
            .then(() => {
              isSuccess = true
            })
            .catch((err) => {
              logger.error('Cannot remove blocked item')
              logger.error(err)
              isSuccess = false
            })
        }
      })

      return isSuccess
    } catch (err) {
      logger.error('Cannot remove blocked item')
      logger.error(err)
      return false
    }
  }
}

export default BlockRepository
