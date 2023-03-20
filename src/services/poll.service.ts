import { Poll } from './../models/pg/Poll'
import { ICrudOption } from '@/interfaces/controller.interface'
import PollRepository from '@/repositories/poll.repository'

class PollService {
  private repository

  constructor() {
    this.repository = new PollRepository()
  }

  public async getList(queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getList(queryInfo)
  }

  public async findOne(queryInfo?: ICrudOption): Promise<any> {
    return this.repository.findOne(queryInfo)
  }

  public async create(data: Poll): Promise<any> {
    return this.repository.create(data)
  }

  public async update(data: Partial<Poll>): Promise<any> {
    return this.repository.update(data)
  }

  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    return this.repository.delete(queryInfo)
  }
}

export default PollService
