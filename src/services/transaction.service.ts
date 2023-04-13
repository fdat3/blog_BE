import TransactionRepository from '@/repositories/transaction.respository'

class TransactionService {
  private repository = new TransactionRepository()

  public async create(data: any): Promise<any> {
    return await this.repository.create(data)
  }

  public async getList(queryInfo: any): Promise<any> {
    return await this.repository.getList(queryInfo)
  }

  public async getItem(id: uuid, queryInfo: any): Promise<any> {
    return await this.repository.getItem(id, queryInfo)
  }
}

export default TransactionService
