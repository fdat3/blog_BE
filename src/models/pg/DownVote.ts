import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Blog } from './Blog'
import type { Comment } from './Comment'
import type { User } from './User'

type DownVoteAssociations = 'blogFkId' | 'userFkId' | 'commentFkId'

export class DownVote extends Model<
  InferAttributes<DownVote, { omit: DownVoteAssociations }>,
  InferCreationAttributes<DownVote, { omit: DownVoteAssociations }>
> {
  declare id: CreationOptional<number>
  declare blogId: number | null
  declare userId: number | null
  declare commentId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // DownVote belongsTo Blog (as BlogFkId)
  declare blogFkId?: NonAttribute<Blog>
  declare getBlogFkId: BelongsToGetAssociationMixin<Blog>
  declare setBlogFkId: BelongsToSetAssociationMixin<Blog, number>
  declare createBlogFkId: BelongsToCreateAssociationMixin<Blog>

  // DownVote belongsTo User (as UserFkId)
  declare userFkId?: NonAttribute<User>
  declare getUserFkId: BelongsToGetAssociationMixin<User>
  declare setUserFkId: BelongsToSetAssociationMixin<User, number>
  declare createUserFkId: BelongsToCreateAssociationMixin<User>

  // DownVote belongsTo Comment (as CommentFkId)
  declare commentFkId?: NonAttribute<Comment>
  declare getCommentFkId: BelongsToGetAssociationMixin<Comment>
  declare setCommentFkId: BelongsToSetAssociationMixin<Comment, number>
  declare createCommentFkId: BelongsToCreateAssociationMixin<Comment>

  declare static associations: {
    blogFkId: Association<DownVote, Blog>
    userFkId: Association<DownVote, User>
    commentFkId: Association<DownVote, Comment>
  }

  static initModel(sequelize: Sequelize): typeof DownVote {
    DownVote.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        blogId: {
          type: DataTypes.INTEGER,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        commentId: {
          type: DataTypes.INTEGER,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      },
    )

    return DownVote
  }
}
