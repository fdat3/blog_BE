import { sequelize } from '@/config/sql.config'
import { Comment } from '@/models/pg'
import logger from '@/utils/logger.util'
// import { ICrudOption } from '@/interfaces/controller.interface'
// import {
//     // default as BaseController,
//     default as baseController,
// } from '@/controllers/base.controller'

class BlogRepository {
  private model
  // private baseController = new BaseController()

  constructor() {
    this.model = Comment
  }

  // public async updateTitle(
  //     id: string,
  //     title: string,
  // ): Promise<Partial<Blog> | null> {
  //     try {
  //         return await sequelize.transaction(async (transaction) => {
  //             await Blog.update(
  //                 {
  //                     title,
  //                 },
  //                 {
  //                     where: {
  //                         id,
  //                     },
  //                     transaction,
  //                 },
  //             )

  //             return await Blog.findByPk(id)
  //         })
  //     } catch (e) {
  //         return null
  //     }
  // }

  public async createComment(data: any): Promise<Partial<Comment> | null> {
    try {
      const result: Comment = await sequelize.transaction(
        async (transaction) => {
          return this.model.create(data, { transaction })
        },
      )
      return result.get({ plain: true })
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  // public async blogDelete(id: any): Promise<any> {
  //     try {
  //         return sequelize.transaction(async (transaction) => {
  //             return Blog.destroy({
  //                 where: {
  //                     id,
  //                 },
  //                 transaction,
  //             })
  //         })
  //     } catch (err) {
  //         logger.error(err)
  //         throw err
  //     }
  // }
}

export default BlogRepository
