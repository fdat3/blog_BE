import UpVoteRepository from '@/repositories/upvote.repository'
// import type { UpVote } from '@/models/pg'
// import { ICrudOption } from '@/interfaces/controller.interface'

class UpVoteService {
  private upVoteRepository: UpVoteRepository
  constructor() {
    this.upVoteRepository = new UpVoteRepository()
  }
  public async create(data: any): Promise<unknown> {
    return this.upVoteRepository.create(data)
  }
}

export default UpVoteService
