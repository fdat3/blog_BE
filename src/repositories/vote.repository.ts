import { sequelize } from '@/config/sql.config'
import Message from '@/constants/message.constant'
import BaseController from '@/controllers/base.controller'
import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import { Vote } from '@/models/pg'
import logger from '@/utils/logger.util'
// import { ICrudOption } from '@/interfaces/controller.interface'
// import {
//     // default as BaseController,
//     default as baseController,
// } from '@/controllers/base.controller'

class VoteRepository {
  private model
  // private baseController = new BaseController()

  constructor() {
    this.model = Vote
  }

  public async create(data: any): Promise<any> {
    const t = await sequelize.transaction()
    try {
      // Kiểm tra xem người dùng đã thực hiện hành động nào trước đó
      const userActivity = await Vote.findOne({
        where: {
          userId: data.userId,
          blogId: data.blogId,
          typeVote: data.typeVote,
        },
        transaction: t,
      })
      if (userActivity) {
        // Nếu người dùng đã thực hiện hành động trước đó, từ chối hành động mới
        throw Message.USER_WAS_UPVOTE
      }

      // Khóa row-level để đảm bảo rằng chỉ có một transaction được thực hiện trên một hàng tại một thời điểm
      const [result, created] = await Vote.findOrCreate({
        where: {
          userId: data.userId,
          blogId: data.blogId,
          typeVote: data.typeVote,
        },
        transaction: t,
        lock: true,
      })

      if (!created) {
        // Nếu hàng đã tồn tại, cập nhật hành động mới
        result.typeVote = data.typeVote
        await result.save({ transaction: t })
      }
      // Thực hiện transaction
      await t.commit()
      return result
    } catch (err) {
      // Nếu có lỗi, hoàn tác transaction
      await t.rollback()
      throw err
    }
  }

  public async getAllVotes(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Vote>> {
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

  public async update(id: string, data: any): Promise<Vote | null> {
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

export default VoteRepository
