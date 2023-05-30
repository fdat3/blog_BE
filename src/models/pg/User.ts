import {
  Association,
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
import type { Comment } from './Comment'
import type { Vote } from './Vote'

type UserAssociations = 'votes' | 'comments' | 'blogs'

export class User extends Model<
  InferAttributes<User, { omit: UserAssociations }>,
  InferCreationAttributes<User, { omit: UserAssociations }>
> {
  declare id: CreationOptional<number>
  declare fullname: string | null
  declare email: string | null
  declare password: string | null
  declare dob: Date | null
  declare avatar: string | null
  declare followerCount: number | null
  declare loginType: 'GOOGLE  FACEBOOK' | null
  declare active: boolean | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // User hasMany Vote
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

  // User hasMany Comment
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

  // User hasMany Blog
  declare blogs?: NonAttribute<Blog[]>
  declare getBlogs: HasManyGetAssociationsMixin<Blog>
  declare setBlogs: HasManySetAssociationsMixin<Blog, number>
  declare addBlog: HasManyAddAssociationMixin<Blog, number>
  declare addBlogs: HasManyAddAssociationsMixin<Blog, number>
  declare createBlog: HasManyCreateAssociationMixin<Blog>
  declare removeBlog: HasManyRemoveAssociationMixin<Blog, number>
  declare removeBlogs: HasManyRemoveAssociationsMixin<Blog, number>
  declare hasBlog: HasManyHasAssociationMixin<Blog, number>
  declare hasBlogs: HasManyHasAssociationsMixin<Blog, number>
  declare countBlogs: HasManyCountAssociationsMixin

  declare static associations: {
    votes: Association<User, Vote>
    comments: Association<User, Comment>
    blogs: Association<User, Blog>
  }

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        fullname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        dob: {
          type: DataTypes.DATE,
        },
        avatar: {
          type: DataTypes.BLOB,
        },
        followerCount: {
          type: DataTypes.INTEGER,
        },
        loginType: {
          type: DataTypes.ENUM('GOOGLE  FACEBOOK'),
        },
        active: {
          type: DataTypes.BOOLEAN,
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

    return User
  }
}
