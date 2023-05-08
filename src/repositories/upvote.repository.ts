import { sequelize } from '@/config/sql.config'
import { Blog, UpVote } from '@/models/pg'
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

  // public async create(data: any): Promise<Partial<UpVote> | any> {
  //   try {
  //     const result: UpVote = await sequelize.transaction(
  //       async (transaction) => {
  //         UpVote.create(data, { transaction })
  //         return Blog.increment('upVote', { by: 1, where: { id: data.blogId } })
  //       },
  //     )
  //     return result.get({ plain: true })
  //   } catch (error) {
  //     logger.error(error)
  //     return null
  //   }
  // }

  public async create(data: any): Promise<UpVote | any> {
    try {
      const result: UpVote = await sequelize.transaction(
        async (transaction) => {
          const upVote = await UpVote.create(data, { transaction })
          if (upVote) {
            await Blog.findOne({
              where: {
                id: data.blogId,
              },
              transaction,
            }).then((instance) => {
              if (instance) {
                instance?.increment(
                  {
                    upVote: 1,
                  },
                  {
                    transaction,
                  },
                )
              } else return
            })
          }
          return upVote
        },
      )
      return result.get({ plain: true })
    } catch (error) {
      logger.error(error)
      return null
    }
  }
}

export default UpVoteRepository
