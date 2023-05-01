import { Blog } from '@/models/pg'
import BlogRepository from '@/repositories/blog.repository'

class BlogService {
  private blogRepository: BlogRepository
  constructor() {
    this.blogRepository = new BlogRepository()
  }

  public async createBlog(data: Blog): Promise<Partial<Blog> | null> {
    return this.blogRepository.createBlog(data)
  }
}

export default BlogService
