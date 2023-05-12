import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Blog } from './Blog'
import type { User } from './User'
import type { Vote } from './Vote'

type CommentAssociations = 'blogFkId' | 'userFkId' | 'votes'

export class Comment extends Model<
  InferAttributes<Comment, { omit: CommentAssociations }>,
  InferCreationAttributes<Comment, { omit: CommentAssociations }>
> {
  declare id: CreationOptional<number>
  declare blogId: number | null
  declare userId: number | null
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

  // Comment hasMany Vote
  declare votes?: NonAttribute<Vote[]>
  declare getVotes: HasManyGetAssociationsMixin<Vote>
  declare setVotes: HasManySetAssociationsMixin<Vote, number>
  declare addVote: HasManyAddAssociationMixin<Vote, number>
  declare addVotes: HasManyAddAssociationsMixin<Vote, number>
  declare createVote: HasManyCreateAssociationMixin<Vote>
  declare removeVote: HasManyRemoveAssociationMixin<Vote, number>
  declare removeVotes: HasManyRemoveAssociationsMixin<Vote, number>
  declare hasVote: HasManyHasAssociationMixin<Vote, number>
  declare hasVotes: HasManyHasAssociationsMixin<Vote, number>
  declare countVotes: HasManyCountAssociationsMixin

  declare static associations: {
    blogFkId: Association<Comment, Blog>
    userFkId: Association<Comment, User>
    votes: Association<Comment, Vote>
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
