import logger from '@/utils/logger.util'
import PollCommentRepository from '../pollComment.repository'
import { HideComment } from '@/models/pg'
import { sequelize } from '@/config/sql.config'

class AdminPollCommentRepository extends PollCommentRepository {
  constructor() {
    super()
  }

  public async createHiddenComment(
    commentId: uuid,
    reason?: string,
  ): Promise<HideComment> {
    try {
      return sequelize.transaction(async (transaction) => {
        return await HideComment.create(
          {
            commentId,
            reason,
          },
          { transaction },
        )
      })
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}

export default AdminPollCommentRepository
