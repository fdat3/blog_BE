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

  public async createUpVote(data: any): Promise<UpVote | any> {
    try {
      const existingUpVote = await Blog.findOne({
        where: {
          userId: data.userId,
          id: data.blogId,
        },
      })

      if (existingUpVote?.upVote === 1) {
        return existingUpVote.get({ plain: true })
      }

      const result: UpVote = await sequelize.transaction(
        async (transaction) => {
          const upVote = await UpVote.create(data, { transaction })
          await Blog.findOne({
            where: {
              id: data.blogId,
              userId: data.userId,
            },
            transaction,
          }).then((instance) => {
            if (instance?.upVote === 0 && instance?.downVote === 1) {
              instance?.decrement({
                downVote: 1,
              })
              instance?.increment(
                {
                  upVote: 1,
                },
                {
                  transaction,
                },
              )
            } else {
              instance?.increment(
                {
                  upVote: 1,
                },
                {
                  transaction,
                },
              )
            }
          })
          return upVote
        },
      )

      return result.get({ plain: true })
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  public async createDownvote(data: any): Promise<UpVote | any> {
    try {
      const existingDownVote = await Blog.findOne({
        where: {
          userId: data.userId,
          id: data.blogId,
        },
      })

      if (existingDownVote?.downVote === 1) {
        return existingDownVote.get({ plain: true })
      }
      const result: UpVote = await sequelize.transaction(
        async (transaction) => {
          const downVote = await UpVote.create(data, { transaction })
          if (downVote) {
            await Blog.findOne({
              where: {
                id: data.blogId,
              },
              transaction,
            }).then((instance) => {
              if (instance?.upVote === 1 && instance?.downVote === 0) {
                instance?.decrement({
                  upVote: 1,
                })
                instance?.increment(
                  {
                    downVote: 1,
                  },
                  {
                    transaction,
                  },
                )
              } else {
                instance?.increment(
                  {
                    downVote: 1,
                  },
                  {
                    transaction,
                  },
                )
              }
            })
          }
          return downVote
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
