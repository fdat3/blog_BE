import { Group } from './../models/pg/Group'
import { ICrudOption } from '@/interfaces/controller.interface'
import GroupRepository from '@/repositories/group.repository'

class GroupService {
  private repository

  constructor() {
    this.repository = new GroupRepository()
  }

  public async getList(queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getList(queryInfo)
  }

  public async getItem(id: uuid, queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getItem(id, queryInfo)
  }

  public async create(user: any, data: any): Promise<any> {
    return this.repository.create(user, data)
  }

  public async update(data: Partial<Group>): Promise<any> {
    return this.repository.update(data)
  }

  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    return this.repository.delete(queryInfo)
  }

  public async joinGroup(userId: uuid, groupId: uuid): Promise<any> {
    return this.repository.joinGroup(userId, groupId)
  }
}

export default GroupService
