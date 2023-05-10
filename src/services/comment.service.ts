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
    const user = await this.commentRepository.findById(id)
    return user
  }

  // public async deleteBlog(id: any): Promise<any> {
  //     const blog = await this.blogRepository.blogDelete(id)
  //     return blog
  // }
  public async updateContent(id: string, content: string): Promise<any> {
    const comment = await this.commentRepository.updateComment(id, content)
    return comment
  }
  // public async findAll(queryInfo?: ICrudOption): Promise<any> {
  //     const blogs = await this.blogRepository.findAll(queryInfo)
  //     return blogs
  // }
}

export default CommentService
