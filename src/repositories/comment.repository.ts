import { sequelize } from '@/config/sql.config'
import BaseController from '@/controllers/base.controller'
import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import { Comment } from '@/models/pg'
import logger from '@/utils/logger.util'
import { Includeable } from 'sequelize'
// import { ICrudOption } from '@/interfaces/controller.interface'
// import {
//     // default as BaseController,
//     default as baseController,
// } from '@/controllers/base.controller'

class CommentRepository {
  private model
  // private baseController = new BaseController()

  constructor() {
    this.model = Comment
  }

  public static readonly DEFAULT_INCLUDES: Includeable = {
    all: true,
    nested: true,
  }

  public async findById(id: string): Promise<Partial<Comment> | null> {
    const comment = await Comment.findByPk(id, {
      include: [
        {
          association: 'userFkId',
          attributes: ['fullname'],
        },
      ],
    })
    if (comment) {
      return comment.get({ plain: true })
    }
    return null
  }

  public async updateComment(
    id: string,
    content: string,
  ): Promise<Partial<Comment> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await Comment.update(
          {
            content,
          },
          {
            where: {
              id,
            },
            transaction,
          },
        )

        return await Comment.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async createComment(comment: Comment): Promise<any> {
    try {
      return sequelize.transaction(async (transaction) => {
        return this.model.create(comment, {
          include: CommentRepository.DEFAULT_INCLUDES,
          transaction,
        })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async deleteComment(id: any): Promise<any> {
    try {
      return sequelize.transaction(async (transaction) => {
        return Comment.destroy({
          where: {
            id,
          },
          transaction,
        })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async getAllComments(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Comment>> {
    try {
      return this.model.findAndCountAll(
        BaseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default CommentRepository
