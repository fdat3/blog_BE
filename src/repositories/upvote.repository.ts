import { sequelize } from '@/config/sql.config'
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

  public async create(data: any): Promise<Partial<UpVote> | null> {
    try {
      const result: UpVote = await sequelize.transaction(
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
}

export default UpVoteRepository
