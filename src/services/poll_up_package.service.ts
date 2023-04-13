import PollUpPackageRepository from '@/repositories/pull_up_package.repository'
import type { PollUpPackage } from '@/models/pg'
import { ICrudOption } from '@/interfaces/controller.interface'

class PollUpPackageService {
  private service = new PollUpPackageRepository()

  public async getList(queryInfo: ICrudOption): Promise<any> {
    return await this.service.getList(queryInfo)
  }

  public async getItem(id: uuid, queryInfo: ICrudOption): Promise<any> {
    return await this.service.getItem(id, queryInfo)
  }

  public async create(pollUpPackage: PollUpPackage): Promise<any> {
    return await this.service.create(pollUpPackage)
  }

  public async update(id: uuid, pollUpPackage: PollUpPackage): Promise<any> {
    return await this.service.update(id, pollUpPackage)
  }

  public async setActive(id: uuid): Promise<any> {
    return await this.service.setActive(id)
  }

  public async setInActive(id: uuid): Promise<any> {
    return await this.service.setInActive(id)
  }
}

export default PollUpPackageService
