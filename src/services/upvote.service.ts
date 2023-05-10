import UpVoteRepository from '@/repositories/upvote.repository'
// import type { UpVote } from '@/models/pg'
// import { ICrudOption } from '@/interfaces/controller.interface'

class UpVoteService {
  private upVoteRepository: UpVoteRepository
  constructor() {
    this.upVoteRepository = new UpVoteRepository()
  }
  public async createUpVote(data: any): Promise<unknown> {
    return this.upVoteRepository.createUpVote(data)
  }
  public async createDownvote(data: any): Promise<unknown> {
    return this.upVoteRepository.createDownvote(data)
  }
}

export default UpVoteService
