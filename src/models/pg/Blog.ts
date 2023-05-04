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
import type { Comment } from './Comment'
import type { UpVote } from './UpVote'

type BlogAssociations = 'upVotes' | 'comments'

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

  // Blog hasMany UpVote
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

  declare static associations: {
    upVotes: Association<Blog, UpVote>
    comments: Association<Blog, Comment>
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
          type: DataTypes.BIGINT,
        },
        employeeId: {
          type: DataTypes.BIGINT,
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
