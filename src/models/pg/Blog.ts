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
// import type { Comment } from './Comment'
import type { Like } from './Like'

type BlogAssociations = 'likes' | 'comments'

export class Blog extends Model<
  InferAttributes<Blog, { omit: BlogAssociations }>,
  InferCreationAttributes<Blog, { omit: BlogAssociations }>
> {
  declare id: CreationOptional<number>
  declare userId: string | null
  declare employeeId: string | null
  declare title: string | null
  declare subTitle: string | null
  declare slug: string | null
  declare meta: string | null
  declare body: string | null
  declare upVote: number | null
  declare downVote: number | null
  declare averageVote: number | null
  declare readCount: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Blog hasMany Like
  declare likes?: NonAttribute<Like[]>
  declare getLikes: HasManyGetAssociationsMixin<Like>
  declare setLikes: HasManySetAssociationsMixin<Like, number>
  declare addLike: HasManyAddAssociationMixin<Like, number>
  declare addLikes: HasManyAddAssociationsMixin<Like, number>
  declare createLike: HasManyCreateAssociationMixin<Like>
  declare removeLike: HasManyRemoveAssociationMixin<Like, number>
  declare removeLikes: HasManyRemoveAssociationsMixin<Like, number>
  declare hasLike: HasManyHasAssociationMixin<Like, number>
  declare hasLikes: HasManyHasAssociationsMixin<Like, number>
  declare countLikes: HasManyCountAssociationsMixin

  // Blog hasMany Comment
  declare comments?: NonAttribute<Comment[]>
  declare getComments: HasManyGetAssociationsMixin<Comment>
  declare setComments: HasManySetAssociationsMixin<Comment, number>
  declare addComment: HasManyAddAssociationMixin<Comment, number>
  declare addComments: HasManyAddAssociationsMixin<Comment, number>
  // declare createComment: HasManyCreateAssociationMixin<Comment>
  declare removeComment: HasManyRemoveAssociationMixin<Comment, number>
  declare removeComments: HasManyRemoveAssociationsMixin<Comment, number>
  declare hasComment: HasManyHasAssociationMixin<Comment, number>
  declare hasComments: HasManyHasAssociationsMixin<Comment, number>
  declare countComments: HasManyCountAssociationsMixin

  declare static associations: {
    likes: Association<Blog, Like>
    // comments: Association<Blog, Comment>
  }

  static initModel(sequelize: Sequelize): typeof Blog {
    Blog.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        employeeId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        title: {
          type: DataTypes.TEXT,
        },
        subTitle: {
          type: DataTypes.TEXT,
        },
        slug: {
          type: DataTypes.STRING,
        },
        meta: {
          type: DataTypes.STRING,
        },
        body: {
          type: DataTypes.TEXT,
        },
        upVote: {
          type: DataTypes.INTEGER,
        },
        downVote: {
          type: DataTypes.INTEGER,
        },
        averageVote: {
          type: DataTypes.FLOAT,
        },
        readCount: {
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

    return Blog
  }
}
