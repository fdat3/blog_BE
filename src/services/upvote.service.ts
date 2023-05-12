import { GetListRepository } from '@/interfaces/base.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import { UpVote } from '@/models/pg'
import UpVoteRepository from '@/repositories/upvote.repository'
// import type { UpVote } from '@/models/pg'
// import { ICrudOption } from '@/interfaces/controller.interface'

class UpVoteService {
  private upVoteRepository: UpVoteRepository
  constructor() {
    this.upVoteRepository = new UpVoteRepository()
  }
  public async createUpVote(data: any): Promise<any> {
    return this.upVoteRepository.create(data)
  }
  public async delete(id: string): Promise<any> {
    return this.upVoteRepository.delete(id)
  }
  public async findAll(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<UpVote>> {
    return this.upVoteRepository.getAllVotes(queryInfo)
  }
}

export default UpVoteService
