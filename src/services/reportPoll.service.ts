import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import type { ReportPoll, Poll } from '@/models/pg'
import ReportPollRepository from '@/repositories/reportPoll.repository'
class ReportPollService {
  private repository = new ReportPollRepository()

  public async create(reportPoll: ReportPoll): Promise<ReportPoll> {
    return await this.repository.create(reportPoll)
  }

  public async update(
    id: uuid,
    reportPoll: ReportPoll,
  ): Promise<ReportPoll | null> {
    return await this.repository.update(id, reportPoll)
  }

  public async delete(id: uuid): Promise<ReportPoll | null> {
    return await this.repository.delete(id)
  }

  public async findOne(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<ReportPoll | null> {
    return await this.repository.findOne(id, queryInfo)
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<ReportPoll>> {
    return await this.repository.getList(queryInfo)
  }

  public async getReportPollByPollId(pollId: uuid): Promise<Poll | null> {
    return await this.repository.getReportPollByPollId(pollId)
  }
}

export default ReportPollService
