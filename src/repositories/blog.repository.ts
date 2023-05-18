import { sequelize } from '@/config/sql.config'
import { Blog } from '@/models/pg'
import logger from '@/utils/logger.util'
import Message from '@/constants/message.constant'

class BlogRepository {
  private model
  // private baseController = new BaseController()

  constructor() {
    this.model = Blog
  }

  public async findAll(): Promise<Partial<Blog[]> | null> {
    try {
      const blogs = await Blog.findAll()
      return blogs
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  public async findById(id: string): Promise<Partial<Blog> | null> {
    try {
      const blog = await Blog.findOne({
        where: {
          id: id,
        },
        include: [
          {
            association: 'comments',
          },
        ],
        attributes: {
          include: [
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM "votes" as "Vote" WHERE "Vote"."blog_id" = "Blog"."id" AND type_vote = 'UP')`,
              ),
              'total_upvote',
            ],
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM "votes" as "Vote" WHERE "Vote"."blog_id" = "Blog"."id" AND type_vote = 'DOWN')`,
              ),
              'total_downvote',
            ],
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM "comments" as "Comment" WHERE "Comment"."blog_id" = "Blog"."id")`,
              ),
              'total_comments',
            ],
          ],
        },
      })
      return blog
    } catch (error) {
      return null
    }
  }

  public async findBlog(keyword: string): Promise<Partial<Blog> | undefined> {
    const blog = await Blog.findOne({
      where: {
        title: keyword,
      },
    })
    if (keyword) {
      return blog?.get({ plain: true })
    }
    return undefined
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
      let isSuccess: boolean = false
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then(async (upvote) => {
            if (!upvote) throw Message.BLOG_NOT_DELETE
            await upvote.destroy({ transaction })
            isSuccess = true
          })
          .catch((err) => {
            throw err
          })
      })
      return {
        isSuccess,
      }
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default BlogRepository
