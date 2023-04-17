import type { Poll } from './../models/pg/Poll'
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

  public async getPopularity(queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getPopularity(queryInfo)
  }

  public async getMyPoll(userId: uuid, queryInfo?: ICrudOption): Promise<any> {
    return this.repository.myPollPage(userId, queryInfo)
  }

  public async getPollPage(userId: uuid, queryInfo: ICrudOption): Promise<any> {
    return this.repository.pollPage(userId, queryInfo)
  }

  public async getItem(id: uuid, queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getItem(id, queryInfo)
  }

  public async create(user: any, data: any): Promise<any> {
    return this.repository.create(user, data)
  }

  public async update(pollId: uuid, userId: uuid, data: Poll): Promise<any> {
    return this.repository.update(pollId, userId, data)
  }

  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    return this.repository.delete(queryInfo)
  }
}

export default PollService
