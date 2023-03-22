import FollowRepository from '@/repositories/follow.repository'
import { ICrudOption } from '@/interfaces/controller.interface'

class FollowService {
  private service

  constructor() {
    this.service = new FollowRepository()
  }

  public async getList(queryInfo?: ICrudOption): Promise<any> {
    return await this.service.getList(queryInfo)
  }

  public async getFollowedList(
    userId: uuid,
    queryInfo?: ICrudOption,
  ): Promise<any> {
    return await this.service.getFollowedList(userId, queryInfo)
  }

  public async getFollowingList(
    userId: uuid,
    queryInfo?: ICrudOption,
  ): Promise<any> {
    return await this.service.getFollowingList(userId, queryInfo)
  }

  public async addFollower(userId: uuid, followedId: uuid): Promise<any> {
    return await this.service.addFollower(userId, followedId)
  }

  public async removeFollowedItem(
    userId: uuid,
    followedId: uuid,
  ): Promise<any> {
    return await this.service.removeFollowedItem(userId, followedId)
  }
}

export default FollowService
