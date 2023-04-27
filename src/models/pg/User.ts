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
import type { UpVote } from './UpVote'

type UserAssociations = 'upVotes' | 'comments' | 'blogs'

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

  // User hasMany UpVote
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
    upVotes: Association<User, UpVote>
    comments: Association<User, Comment>
    blogs: Association<User, Blog>
  }

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
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
          type: DataTypes.STRING,
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
