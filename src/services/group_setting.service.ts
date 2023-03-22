import GroupSettingRepository from '@/repositories/group_setting.repository'

class GroupSettingService {
  private service

  constructor() {
    this.service = new GroupSettingRepository()
  }

  public async getSettings(groupId: uuid): Promise<any> {
    return await this.service.getSettings(groupId)
  }

  public async updateSettings(groupId: uuid, data: any): Promise<any> {
    return await this.service.updateSettings(groupId, data)
  }
}

export default GroupSettingService
