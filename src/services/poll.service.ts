import { Poll } from './../models/pg/Poll'
import { ICrudOption } from '@/interfaces/controller.interface'
import PollRepository from '@/repositories/poll.repository'

class PollService {
  private repository

  constructor() {
    this.repository = new PollRepository()
  }

  public async findAll(queryInfo?: ICrudOption): Promise<any> {
    return await this.repository.findAll(queryInfo)
  }

  public async findOne(queryInfo?: ICrudOption): Promise<any> {
    return await this.repository.findOne(queryInfo)
  }

  public async create(data: Poll): Promise<any> {
    return await this.repository.create(data)
  }

  public async update(data: Partial<Poll>): Promise<any> {
    return await this.repository.update(data)
  }

  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    return await this.repository.delete(queryInfo)
  }
}

export default PollService
