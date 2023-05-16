import { ICrudOption } from '@/interfaces/controller.interface'
import type { Comment } from '@/models/pg'
import CommentRepository from '@/repositories/comment.repository'

class CommentService {
  private commentRepository: CommentRepository
  constructor() {
    this.commentRepository = new CommentRepository()
  }

  public async createComment(data: any): Promise<Partial<Comment> | null> {
    return await this.commentRepository.createComment(data)
  }

  public async findById(id: string): Promise<any> {
    const comment = await this.commentRepository.findById(id)
    return comment
  }

  public async deleteComment(id: any): Promise<any> {
    const comment = await this.commentRepository.deleteComment(id)
    return comment
  }
  public async updateContent(id: string, content: string): Promise<any> {
    const comment = await this.commentRepository.updateComment(id, content)
    return comment
  }
  public async getAllComments(queryInfo?: ICrudOption): Promise<any> {
    const blogs = await this.commentRepository.getAllComments(queryInfo)
    return blogs
  }
}

export default CommentService
