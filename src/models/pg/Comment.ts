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
import type { User } from './User'

type CommentAssociations = 'blogFkId' | 'userFkId' | 'parentFkId'

export class Comment extends Model<
  InferAttributes<Comment, { omit: CommentAssociations }>,
  InferCreationAttributes<Comment, { omit: CommentAssociations }>
> {
  declare id: CreationOptional<number>
  declare blogId: number | null
  declare userId: number | null
  declare employeeId: number | null
  declare parentId: number | null
  declare content: string | null
  declare image: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Comment belongsTo Blog (as BlogFkId)
  declare blogFkId?: NonAttribute<Blog>
  declare getBlogFkId: BelongsToGetAssociationMixin<Blog>
  declare setBlogFkId: BelongsToSetAssociationMixin<Blog, number>
  declare createBlogFkId: BelongsToCreateAssociationMixin<Blog>

  // Comment belongsTo User (as UserFkId)
  declare userFkId?: NonAttribute<User>
  declare getUserFkId: BelongsToGetAssociationMixin<User>
  declare setUserFkId: BelongsToSetAssociationMixin<User, number>
  declare createUserFkId: BelongsToCreateAssociationMixin<User>

  // Comment belongsTo Comment (as ParentFkId)
  declare parentFkId?: NonAttribute<Comment>
  declare getParentFkId: BelongsToGetAssociationMixin<Comment>
  declare setParentFkId: BelongsToSetAssociationMixin<Comment, number>
  declare createParentFkId: BelongsToCreateAssociationMixin<Comment>

  declare static associations: {
    blogFkId: Association<Comment, Blog>
    userFkId: Association<Comment, User>
    parentFkId: Association<Comment, Comment>
  }

  static initModel(sequelize: Sequelize): typeof Comment {
    Comment.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        blogId: {
          type: DataTypes.INTEGER,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        employeeId: {
          type: DataTypes.INTEGER,
        },
        parentId: {
          type: DataTypes.INTEGER,
        },
        content: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING,
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

    return Comment
  }
}
