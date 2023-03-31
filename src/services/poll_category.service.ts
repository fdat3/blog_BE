import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import { PollCategory } from '@/models/pg'
import PollCategoryRepository from '@/repositories/poll_category.repository'

class PollCategoryService {
  private pollCategoryRepository: PollCategoryRepository
  constructor() {
    this.pollCategoryRepository = new PollCategoryRepository()
  }
  async findAll(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<PollCategory>> {
    return this.pollCategoryRepository.findAll(queryInfo)
  }
  async findOne(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<PollCategory | null> {
    return this.pollCategoryRepository.findOne(id, queryInfo)
  }
  async update(id: uuid, data: PollCategory): Promise<PollCategory | null> {
    return this.pollCategoryRepository.update(id, data)
  }
  async create(data: PollCategory): Promise<PollCategory> {
    return this.pollCategoryRepository.create(data)
  }
  async delete(id: uuid): Promise<number> {
    return this.pollCategoryRepository.delete(id)
  }
}

export default PollCategoryService
