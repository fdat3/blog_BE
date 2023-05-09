import type { Comment } from '@/models/pg'
import CommentRepository from '@/repositories/comment.repository'

class BlogService {
  private commentRepository: CommentRepository
  constructor() {
    this.commentRepository = new CommentRepository()
  }

  public async createComment(data: any): Promise<Partial<Comment> | null> {
    return await this.commentRepository.createComment(data)
  }

  // public async deleteBlog(id: any): Promise<any> {
  //     const blog = await this.blogRepository.blogDelete(id)
  //     return blog
  // }
  // public async updateTitle(id: string, title: string): Promise<any> {
  //     const user = await this.blogRepository.updateTitle(id, title)
  //     return user
  // }
  // public async findAll(queryInfo?: ICrudOption): Promise<any> {
  //     const blogs = await this.blogRepository.findAll(queryInfo)
  //     return blogs
  // }
  // public async findById(id: string): Promise<any> {
  //     const user = await this.blogRepository.findById(id)
  //     return user
  // }
}

export default BlogService
