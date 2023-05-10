import type { Blog } from '@/models/pg'
import BlogRepository from '@/repositories/blog.repository'
import { ICrudOption } from '@/interfaces/controller.interface'

class BlogService {
  private blogRepository: BlogRepository
  constructor() {
    this.blogRepository = new BlogRepository()
  }

  public async createBlog(data: any): Promise<Partial<Blog> | null> {
    return await this.blogRepository.createBlog(data)
  }

  public async deleteBlog(id: any): Promise<any> {
    const blog = await this.blogRepository.blogDelete(id)
    return blog
  }
  public async updateTitle(id: string, title: string): Promise<any> {
    const blogTitle = await this.blogRepository.updateTitle(id, title)
    return blogTitle
  }
  public async updateContent(id: string, body: string): Promise<any> {
    const blogContent = await this.blogRepository.updateContent(id, body)
    return blogContent
  }
  public async findAll(queryInfo?: ICrudOption): Promise<any> {
    const blogs = await this.blogRepository.findAll(queryInfo)
    return blogs
  }
  public async findById(id: string): Promise<any> {
    const blog = await this.blogRepository.findById(id)
    return blog
  }
}

export default BlogService
