import { sequelize } from '@/config/sql.config'
import { Blog } from '@/models/pg'
import logger from '@/utils/logger.util'

class BlogRepository {
  private model
  // private baseController = new BaseController()

  constructor() {
    this.model = Blog
  }

  public async createBlog(data: any): Promise<Partial<Blog> | null> {
    try {
      const result: Blog = await sequelize.transaction(async (transaction) => {
        const newBlog: Blog = await Blog.create(
          {
            ...data,
          },
          {
            transaction,
          },
        )
        return newBlog
      })
      return result.get({ plain: true })
    } catch (error) {
      logger.error(error)
      return null
    }
  }
}

export default BlogRepository
