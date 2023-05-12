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

type VoteAssociations = 'blogFkId' | 'userFkId' | 'commentFkId'

export class Vote extends Model<
  InferAttributes<Vote, { omit: VoteAssociations }>,
  InferCreationAttributes<Vote, { omit: VoteAssociations }>
> {
  declare id: CreationOptional<number>
  declare userId: number | null
  declare employeeId: number | null
  declare blogId: number | null
  declare commentId: number | null
  declare typeVote: 'UP' | 'DOWN' | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Vote belongsTo Blog (as BlogFkId)
  declare blogFkId?: NonAttribute<Blog>
  declare getBlogFkId: BelongsToGetAssociationMixin<Blog>
  declare setBlogFkId: BelongsToSetAssociationMixin<Blog, number>
  declare createBlogFkId: BelongsToCreateAssociationMixin<Blog>

  // Vote belongsTo User (as UserFkId)
  declare userFkId?: NonAttribute<User>
  declare getUserFkId: BelongsToGetAssociationMixin<User>
  declare setUserFkId: BelongsToSetAssociationMixin<User, number>
  declare createUserFkId: BelongsToCreateAssociationMixin<User>

  // Vote belongsTo Comment (as CommentFkId)
  declare commentFkId?: NonAttribute<Comment>
  declare getCommentFkId: BelongsToGetAssociationMixin<Comment>
  declare setCommentFkId: BelongsToSetAssociationMixin<Comment, number>
  declare createCommentFkId: BelongsToCreateAssociationMixin<Comment>

  declare static associations: {
    blogFkId: Association<Vote, Blog>
    userFkId: Association<Vote, User>
    commentFkId: Association<Vote, Comment>
  }

  static initModel(sequelize: Sequelize): typeof Vote {
    Vote.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        employeeId: {
          type: DataTypes.INTEGER,
        },
        blogId: {
          type: DataTypes.INTEGER,
        },
        commentId: {
          type: DataTypes.INTEGER,
        },
        typeVote: {
          type: DataTypes.ENUM('UP', 'DOWN'),
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

    return Vote
  }
}
