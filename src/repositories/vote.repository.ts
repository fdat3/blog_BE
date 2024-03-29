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

  // public async create(data: any): Promise<any> {
  //   const t = await sequelize.transaction()
  //   try {
  //     // Kiểm tra xem người dùng đã thực hiện hành động nào trước đó
  //     // const userActivity = await Vote.findOne({
  //     //   where: {
  //     //     userId: data.userId,
  //     //     blogId: data.blogId,
  //     //     typeVote: data.typeVote,
  //     //   },
  //     //   transaction: t,
  //     // })
  //     // if (userActivity) {
  //     //   // Nếu người dùng đã thực hiện hành động trước đó, từ chối hành động mới
  //     //   throw Message.USER_WAS_UPVOTE
  //     // }

  //     // Khóa row-level để đảm bảo rằng chỉ có một transaction được thực hiện trên một hàng tại một thời điểm
  //     const [result, created] = await Vote.findOrCreate({
  //       where: {
  //         userId: data.userId,
  //         blogId: data.blogId,
  //         typeVote: data.typeVote,
  //       },
  //       transaction: t,
  //       lock: true,
  //     })

  //     if (!created) {
  //       // Nếu hàng đã tồn tại, cập nhật hành động mới
  //       result.typeVote = data.typeVote
  //       await result.save({ transaction: t })
  //     }
  //     // Thực hiện transaction
  //     await t.commit()
  //     return result
  //   } catch (err) {
  //     // Nếu có lỗi, hoàn tác transaction
  //     await t.rollback()
  //     throw err
  //   }
  // }

  public static isLikedAttribute = (userId: string): string | any => {
    return [
      //isLiked
      sequelize.literal(`
      (
        SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END
        FROM votes
        WHERE "votes"."user_id" = '${userId}' 
        AND "votes"."blog_id" = "Blog"."id" 
        AND "votes"."deleted_at" IS NULL 
        GROUP BY "votes"."blog_id"
      ) IS TRUE`),
      'isLiked',
    ] as any
  }

  public async create(data: any): Promise<any> {
    try {
      logger.http({ data })
      const [result] = await Vote.findOrCreate({
        where: {
          ...data,
        },
        defaults: {
          ...data,
        },
      })
      return result
    } catch (err) {
      logger.error(err)
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

  public async findById(id: string): Promise<Partial<Vote> | null> {
    try {
      const vote = await Vote.findOne({
        where: {
          id: id,
        },
        include: [
          {
            association: 'userFkId',
          },
          {
            association: 'blogFkId',
          },
        ],
        attributes: {
          include: [VoteRepository.isLikedAttribute(id)],
        },
      })
      return vote
    } catch (error) {
      return null
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

  public async update(id: string, data: any): Promise<{ isSuccess: boolean }> {
    try {
      let isSuccess: boolean = false
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then(async (vote) => {
            if (!vote) throw Message.UPDATE_UPVOTE_ERR
            await vote.update(data, { transaction })
            Message.UPDATE_UPVOTE_SUCCESS
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

export default VoteRepository
