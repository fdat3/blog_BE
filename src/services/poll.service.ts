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

  public async userGetList(queryInfo?: ICrudOption): Promise<any> {
    return this.repository.userGetList(queryInfo)
  }

  public async getPopularity(queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getPopularity(queryInfo)
  }

  public async getItem(id: uuid, queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getItem(id, queryInfo)
  }

  public async create(user: any, data: any): Promise<any> {
    return this.repository.create(user, data)
  }

  public async update(data: Partial<Poll>): Promise<any> {
    return this.repository.update(data)
  }

  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    return this.repository.delete(queryInfo)
  }
}

export default PollService
