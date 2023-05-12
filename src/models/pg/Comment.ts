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
import type { DownVote } from './DownVote'
import type { UpVote } from './UpVote'
import type { User } from './User'

type CommentAssociations = 'blogFkId' | 'userFkId' | 'upVotes' | 'downVotes'

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

  // Comment hasMany UpVote
  declare upVotes?: NonAttribute<UpVote[]>
  declare getUpVotes: HasManyGetAssociationsMixin<UpVote>
  declare setUpVotes: HasManySetAssociationsMixin<UpVote, number>
  declare addUpVote: HasManyAddAssociationMixin<UpVote, number>
  declare addUpVotes: HasManyAddAssociationsMixin<UpVote, number>
  declare createUpVote: HasManyCreateAssociationMixin<UpVote>
  declare removeUpVote: HasManyRemoveAssociationMixin<UpVote, number>
  declare removeUpVotes: HasManyRemoveAssociationsMixin<UpVote, number>
  declare hasUpVote: HasManyHasAssociationMixin<UpVote, number>
  declare hasUpVotes: HasManyHasAssociationsMixin<UpVote, number>
  declare countUpVotes: HasManyCountAssociationsMixin

  // Comment hasMany DownVote
  declare downVotes?: NonAttribute<DownVote[]>
  declare getDownVotes: HasManyGetAssociationsMixin<DownVote>
  declare setDownVotes: HasManySetAssociationsMixin<DownVote, number>
  declare addDownVote: HasManyAddAssociationMixin<DownVote, number>
  declare addDownVotes: HasManyAddAssociationsMixin<DownVote, number>
  declare createDownVote: HasManyCreateAssociationMixin<DownVote>
  declare removeDownVote: HasManyRemoveAssociationMixin<DownVote, number>
  declare removeDownVotes: HasManyRemoveAssociationsMixin<DownVote, number>
  declare hasDownVote: HasManyHasAssociationMixin<DownVote, number>
  declare hasDownVotes: HasManyHasAssociationsMixin<DownVote, number>
  declare countDownVotes: HasManyCountAssociationsMixin

  declare static associations: {
    blogFkId: Association<Comment, Blog>
    userFkId: Association<Comment, User>
    upVotes: Association<Comment, UpVote>
    downVotes: Association<Comment, DownVote>
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
