import { ICrudOption } from '@/interfaces/controller.interface'
import DeviceRepository from '@/repositories/device.repository'

class DeviceService {
  private repository: DeviceRepository

  constructor() {
    this.repository = new DeviceRepository()
  }

  public async getList(queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getList(queryInfo)
  }

  public getItem(id: uuid, queryInfo?: ICrudOption): Promise<any> {
    return this.repository.getItem(id, queryInfo)
  }

  public async delete(id: uuid): Promise<any> {
    return this.repository.delete(id)
  }
}

export default DeviceService
