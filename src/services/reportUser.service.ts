import { ICrudOption } from '@/interfaces/controller.interface'
import type { ReportUser } from '@/models/pg'
import { GetListRepository } from '@/interfaces/base.interface'
import ReportUserRepository from '@/repositories/reportUser.repository'

class ReportUserService {
  private repository = new ReportUserRepository()

  public async create(data: ReportUser): Promise<ReportUser | null> {
    return this.repository.create(data)
  }

  public async findOne(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<ReportUser | null> {
    return this.repository.findOne(id, queryInfo)
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<ReportUser>> {
    return this.repository.getList(queryInfo)
  }

  public async update(id: uuid, data: ReportUser): Promise<ReportUser | null> {
    return this.repository.update(id, data)
  }

  public async delete(id: uuid): Promise<unknown> {
    return this.repository.delete(id)
  }
}

export default ReportUserService
