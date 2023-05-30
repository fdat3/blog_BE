import { sequelize } from '@/config/sql.config'
import { Blog, User } from '@/models/pg'
import logger from '@/utils/logger.util'
import Message from '@/constants/message.constant'
import { ICrudOption } from '@/interfaces/controller.interface'
import baseController from '@/controllers/base.controller'

export class BlogExtendAttribute {
  public static isLikedAttribute = (userId: string): (string | any)[] => {
    return [
      //isLiked
      sequelize.literal(`
      (
        SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END
        FROM votes
        WHERE "votes"."user_id" = '${userId}'
        AND "votes"."blog_id" = "Blog"."id" 
        AND "votes"."deleted_at" IS NULL 
        GROUP BY "votes"."blog_id"
      ) IS TRUE`),
      'isLiked',
    ] as any
  }

  public static upVoteCount = [
    sequelize.literal(
      `(SELECT COUNT(*) FROM "votes" as "Vote" WHERE "Vote"."blog_id" = "Blog"."id" AND type_vote = 'UP')`,
    ),
    'total_upvote',
  ]

  public static downVoteCount = [
    sequelize.literal(
      `(SELECT COUNT(*) FROM "votes" as "Vote" WHERE "Vote"."blog_id" = "Blog"."id" AND type_vote = 'DOWN')`,
    ),
    'total_downvote',
  ]

  public static commentCount = [
    sequelize.literal(
      `(SELECT COUNT(*) FROM "comments" as "Comment" WHERE "Comment"."blog_id" = "Blog"."id")`,
    ),
    'total_comments',
  ]
}

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

  public async getBlog(
    id: string,
    queryInfo?: ICrudOption,
  ): Promise<Blog | null> {
    try {
      if (queryInfo) {
        queryInfo.attributes = {
          include: [
            BlogExtendAttribute.isLikedAttribute(queryInfo?.userId),
            BlogExtendAttribute.upVoteCount,
            BlogExtendAttribute.downVoteCount,
            BlogExtendAttribute.commentCount,
          ]
        };
      }
      const result = await this.model.findByPk(id, {
        ...baseController.applyFindOptions(queryInfo),
        include: [
          {
            association: 'comments',
            include: [
              {
                association: 'user',
                attributes: ['fullname']
              }
            ]
          },
        ],
      });
      return result;
    } catch (err) {
      logger.error(err);
      return null;
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
          {
            association: 'votes',
          },
        ],
        attributes: {
          include: [],
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
