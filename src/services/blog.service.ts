import { ICrudOption } from '@/interfaces/controller.interface'
import type { Blog } from '@/models/pg'
import BlogRepository from '@/repositories/blog.repository'

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
  public async findAll(): Promise<any> {
    const blogs = await this.blogRepository.findAll()
    return blogs
  }
  public async findBlog(keyword: string): Promise<any> {
    const blog = await this.blogRepository.findBlog(keyword)
    return blog
  }
  public async getBlog(id: string, queryInfo: ICrudOption): Promise<any> {
    const result = await this.blogRepository.getBlog(id, queryInfo)
    return result
  }
  public async findById(id: string): Promise<any> {
    const blog = await this.blogRepository.findById(id)
    return blog
  }
}

export default BlogService
