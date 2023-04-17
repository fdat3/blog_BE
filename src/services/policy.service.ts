import { ICrudOption } from '@/interfaces/controller.interface'
import type { Policy } from '@/models/pg'
import PolicyRepository from '@/repositories/policy.repository'
import { GetListRepository } from '@/interfaces/base.interface'

class PolicyService {
  private repository = new PolicyRepository()

  public async create(data: Policy): Promise<Policy | null> {
    return this.repository.create(data)
  }

  public async findOne(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<Policy | null> {
    return this.repository.findOne(id, queryInfo)
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Policy>> {
    return this.repository.getList(queryInfo)
  }

  public async update(id: uuid, data: Policy): Promise<Policy | null> {
    return this.repository.update(id, data)
  }

  public async delete(id: uuid): Promise<unknown> {
    return this.repository.delete(id)
  }
}

export default PolicyService
