import ModelPgConstant from '@/constants/model.pg.constant'
import { sequelize } from '@/config/sql.config'
import { HideComment } from './../models/pg/HideComment'
import logger from '@/utils/logger.util'
import { GetListRepository } from '@/interfaces/base.interface'
import { PollComment } from '@/models/pg'
import { Op } from 'sequelize'
class HideCommentRepository {
  public model = HideComment

  public create(commentId: uuid, reason: string): Promise<HideComment> {
    try {
      return sequelize.transaction(async (transaction) => {
        return this.model.create(
          {
            commentId,
            reason,
          },
          { transaction },
        )
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  /**
   *
   *
   * @param {uuid} userId
   * @return {*}  {Promise<GetListRepository<PollComment>>}
   * @memberof HideCommentRepository
   */
  public getListCommentHidedByUser(
    userId: uuid,
  ): Promise<GetListRepository<PollComment>> {
    try {
      return PollComment.findAndCountAll({
        where: {
          userId,
          // If comment is hidden, get only comment that is hidden by user
          id: {
            [Op.in]: sequelize.literal(
              `(SELECT "commentId" FROM ${ModelPgConstant.HIDE_COMMENT} WHERE "userId" = '${userId}')`,
            ),
          },
        },
        include: [
          {
            association: 'poll',
          },
          {
            association: 'parent',
          },
          {
            association: 'mentions',
          },
          {
            association: 'hashtags',
          },
          {
            association: 'likes',
          },
          {
            association: 'user',
          },
          {
            association: 'hideComment',
          },
        ],
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default HideCommentRepository
