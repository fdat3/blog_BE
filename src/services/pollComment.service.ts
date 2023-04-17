import PollCommentRepository from '@/repositories/pollComment.repository'
import type { PollComment, Like } from '@/models/pg'

class PollCommentService {
  public repository = new PollCommentRepository()

  public async create(data: PollComment): Promise<PollComment> {
    return this.repository.create(data)
  }

  public async update(id: uuid, data: PollComment): Promise<PollComment> {
    return this.repository.update(id, data)
  }

  public async delete(id: uuid, userId: uuid): Promise<{ isSuccess: boolean }> {
    return this.repository.delete(id, userId)
  }

  public async findOne(id: uuid): Promise<PollComment | null> {
    return this.repository.findOne(id)
  }

  public async createLike(
    pollCommentId: uuid,
    userId: uuid,
  ): Promise<Like | null> {
    return this.repository.createLike(pollCommentId, userId)
  }

  public async removeLike(
    id: uuid,
    userId: uuid,
  ): Promise<{ isSuccess: boolean }> {
    return this.repository.removeLike(id, userId)
  }
}

export default PollCommentService
