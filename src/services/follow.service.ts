import FollowRepository from '@/repositories/follow.repository'
import { ICrudOption } from '@/interfaces/controller.interface'
import { Follow } from '@/models/pg'
import UserService from '@/services/user.service'

class FollowService {
  private service
  private userService: UserService

  constructor() {
    this.service = new FollowRepository()
    this.userService = new UserService()
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

  public async updateClickCount(userId: uuid, followedId: uuid): Promise<void> {
    return this.service.updateClickCount(userId, followedId)
  }

  public async notFollowBackList(userId: uuid): Promise<any> {
    const followingList = await this.getFollowingList(userId)
    const { rows: followingListRaw } = followingList

    const followedList = await this.getFollowedList(userId)
    const { rows: followedListRaw } = followedList

    const userFollowingList = followingListRaw.map(
      (item: Follow) => item.userId,
    )
    const selfFollowedList = followedListRaw.map(
      (item: Follow) => item.followedId,
    )

    const filterUsers = selfFollowedList.filter(
      (item: uuid) => !userFollowingList.include(item),
    )

    const getListUser = this.userService.findAll({
      filter: {
        id: {
          $notIn: filterUsers,
        },
      },
    })

    return getListUser
  }
}

export default FollowService
