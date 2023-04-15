import { sequelize } from '@/config/sql.config'
import Message from '@/constants/message.constant'
import BaseController from '@/controllers/base.controller'
import { ICrudOption } from '@/interfaces/controller.interface'
import { Like } from '@/models/pg'
import logger from '@/utils/logger.util'

class LikeRepository {
  private model = Like

  public async create(data: any): Promise<Like | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        return this.model.create(data, { transaction })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async findOne(id: uuid, queryInfo: ICrudOption): Promise<Like | null> {
    try {
      return this.model.findByPk(id, BaseController.applyFindOptions(queryInfo))
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async getList(queryInfo: ICrudOption): Promise<unknown> {
    try {
      return this.model.findAndCountAll(
        BaseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async update(id: uuid, data: any): Promise<Like | null> {
    try {
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then((like) => {
            if (!like) throw Message.UPDATE_LIKE_ERR
            like.update(data, { transaction })
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

  public async delete(id: uuid, userId: uuid): Promise<{ isSuccess: boolean }> {
    try {
      let isSuccess: boolean = false
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then((like) => {
            if (!like) throw Message.DELETE_LIKE_ERR
            if (like.userId !== userId) throw Message.DELETE_LIKE_ERR
            like.destroy({ transaction })
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

export default LikeRepository
