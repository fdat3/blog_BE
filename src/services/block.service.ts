import BlockRepository from '@/repositories/block.repository'
import { ICrudOption } from '@/interfaces/controller.interface'
import { CDData } from '@/interfaces/block.interface'

class BlockService {
  private repository: BlockRepository

  constructor() {
    this.repository = new BlockRepository()
  }

  public async getList(queryInfo?: ICrudOption): Promise<any> {
    return await this.repository.getList(queryInfo)
  }

  public async findOne(id: uuid): Promise<any> {
    return await this.repository.findOne(id)
  }

  public async create(data: CDData): Promise<any> {
    const { blockerId, blockedId } = data
    return await this.repository.create(blockerId, blockedId)
  }

  public delete(data: CDData): Promise<any> {
    const { blockerId, blockedId } = data
    return this.repository.delete(blockerId, blockedId)
  }
}

export default BlockService
