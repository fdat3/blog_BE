import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import { Vote } from '@/models/pg'
import VoteRepository from '@/repositories/vote.repository'
// import type { UpVote } from '@/models/pg'
// import { ICrudOption } from '@/interfaces/controller.interface'

class VoteService {
  private voteRepository: VoteRepository
  constructor() {
    this.voteRepository = new VoteRepository()
  }
  public async createUpVote(data: any): Promise<any> {
    console.log(data)
    return this.voteRepository.create(data)
  }
  public async delete(id: string): Promise<any> {
    return this.voteRepository.delete(id)
  }
  public async findAll(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Vote>> {
    return this.voteRepository.getAllVotes(queryInfo)
  }
  public async updateVote(id: string, data: any): Promise<any> {
    return this.voteRepository.update(id, data)
  }
}

export default VoteService
