import { sequelize } from '@/config/sql.config'
import Message from '@/constants/message.constant'
import BaseController from '@/controllers/base.controller'
import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import { UpVote } from '@/models/pg'
import logger from '@/utils/logger.util'
// import { ICrudOption } from '@/interfaces/controller.interface'
// import {
//     // default as BaseController,
//     default as baseController,
// } from '@/controllers/base.controller'

class UpVoteRepository {
  private model
  // private baseController = new BaseController()

  constructor() {
    this.model = UpVote
  }

  public async create(data: any): Promise<UpVote | any> {
    try {
      const result: UpVote = await sequelize.transaction(
        async (transaction) => {
          const upVote = await UpVote.create(data, { transaction })
          return upVote
        },
      )
      return result.get({ plain: true })
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  public async getAllVotes(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<UpVote>> {
    try {
      return this.model.findAndCountAll(
        BaseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async delete(id: string): Promise<{ isSuccess: boolean }> {
    try {
      let isSuccess: boolean = false
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then(async (upvote) => {
            if (!upvote) throw Message.DELETE_UPVOTE_ERR
            await upvote.destroy({ transaction })
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

  public async update(id: string, data: any): Promise<UpVote | null> {
    try {
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then((vote) => {
            if (!vote) throw Message.UPDATE_UPVOTE_ERR
            vote.update(data, { transaction })
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
}

export default UpVoteRepository
