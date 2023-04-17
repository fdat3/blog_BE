import { sequelize } from '@/config/sql.config'
import BaseController from '@/controllers/base.controller'
import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import { Poll, ReportPoll } from '@/models/pg'
import logger from '@/utils/logger.util'

class ReportPollRepository {
  private model = ReportPoll

  public async create(reportPoll: ReportPoll): Promise<ReportPoll> {
    try {
      return sequelize.transaction(async (transaction) => {
        return await this.model.create(reportPoll, { transaction })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async update(
    id: uuid,
    reportPoll: ReportPoll,
  ): Promise<ReportPoll | null> {
    try {
      await sequelize.transaction(async (transaction) => {
        await this.model.update(reportPoll, { where: { id }, transaction })
      })

      return await this.model.findByPk(id)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async delete(id: uuid): Promise<ReportPoll | null> {
    try {
      await sequelize.transaction(async (transaction) => {
        await this.model.destroy({ where: { id }, transaction })
      })

      return await this.model.findByPk(id)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async findOne(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<ReportPoll | null> {
    try {
      return await this.model.findByPk(
        id,
        BaseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<ReportPoll>> {
    try {
      return await this.model.findAndCountAll(
        BaseController.applyFindOptions(queryInfo),
      )
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async getReportPollByPollId(pollId: uuid): Promise<Poll | null> {
    try {
      return await Poll.findByPk(pollId, {
        include: [
          {
            association: Poll.associations.reports,
            required: true,
          },
        ],
        order: [[Poll.associations.reports, 'createdAt', 'DESC']],
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default ReportPollRepository
