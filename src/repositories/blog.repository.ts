import { sequelize } from '@/config/sql.config'
import { Blog } from '@/models/pg'
import logger from '@/utils/logger.util'
import { ICrudOption } from '@/interfaces/controller.interface'
import {
  // default as BaseController,
  default as baseController,
} from '@/controllers/base.controller'

class BlogRepository {
  private model
  // private baseController = new BaseController()

  constructor() {
    this.model = Blog
  }

  public async findAll(
    queryInfo?: ICrudOption,
  ): Promise<{ rows: Partial<Blog[]>; count: number } | null> {
    try {
      const blogs = await this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
      return blogs
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  public async findById(id: string): Promise<Partial<Blog> | null> {
    const blog = await Blog.findByPk(id)
    if (blog) {
      return blog.get({ plain: true })
    }
    return null
  }

  public async updateTitle(
    id: string,
    title: string,
  ): Promise<Partial<Blog> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await Blog.update(
          {
            title,
          },
          {
            where: {
              id,
            },
            transaction,
          },
        )
        return await Blog.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async updateContent(
    id: string,
    body: string,
  ): Promise<Partial<Blog> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await Blog.update(
          { body },
          {
            where: {
              id,
            },
            transaction,
          },
        )
        return await Blog.findByPk(id)
      })
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  public async createBlog(data: any): Promise<Partial<Blog> | null> {
    try {
      const result: Blog = await sequelize.transaction(async (transaction) => {
        return this.model.create(data, { transaction })
      })
      return result.get({ plain: true })
    } catch (error) {
      logger.error(error)
      return null
    }
  }

  public async blogDelete(id: any): Promise<any> {
    try {
      return sequelize.transaction(async (transaction) => {
        return Blog.destroy({
          where: {
            id,
          },
          transaction,
        })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default BlogRepository
