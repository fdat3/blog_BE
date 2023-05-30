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
  Sequelize
} from 'sequelize'
import type { Comment } from './Comment'
import type { User } from './User'
import type { Vote } from './Vote'

type BlogAssociations = 'comments' | 'votes' | 'user'

export class Blog extends Model<
  InferAttributes<Blog, { omit: BlogAssociations }>,
  InferCreationAttributes<Blog, { omit: BlogAssociations }>
> {
  declare id: CreationOptional<number>
  declare userId: number | null
  declare title: string | null
  declare subTitle: string | null
  declare slug: string | null
  declare meta: string | null
  declare body: string | null
  declare readCount: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Blog hasMany Comment
  declare comments?: NonAttribute<Comment[]>
  declare getComments: HasManyGetAssociationsMixin<Comment>
  declare setComments: HasManySetAssociationsMixin<Comment, number>
  declare addComment: HasManyAddAssociationMixin<Comment, number>
  declare addComments: HasManyAddAssociationsMixin<Comment, number>
  declare createComment: HasManyCreateAssociationMixin<Comment>
  declare removeComment: HasManyRemoveAssociationMixin<Comment, number>
  declare removeComments: HasManyRemoveAssociationsMixin<Comment, number>
  declare hasComment: HasManyHasAssociationMixin<Comment, number>
  declare hasComments: HasManyHasAssociationsMixin<Comment, number>
  declare countComments: HasManyCountAssociationsMixin

  // Blog hasMany Vote (as Votes)
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

  // Blog belongsTo User
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, number>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    comments: Association<Blog, Comment>,
    votes: Association<Blog, Vote>,
    user: Association<Blog, User>
  }

  static initModel(sequelize: Sequelize): typeof Blog {
    Blog.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.TEXT
      },
      subTitle: {
        type: DataTypes.TEXT
      },
      slug: {
        type: DataTypes.STRING
      },
      meta: {
        type: DataTypes.STRING
      },
      body: {
        type: DataTypes.TEXT
      },
      readCount: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })

    return Blog
  }
}
