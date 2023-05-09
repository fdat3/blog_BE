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

type BlogAssociations = 'comments' | 'votes'

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
  declare upVote: number | null
  declare downVote: number | null
  declare averageVote: number | null
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

  // Blog hasMany UpVote (as Votes)
  declare votes?: NonAttribute<UpVote[]>
  declare getVotes: HasManyGetAssociationsMixin<UpVote>
  declare setVotes: HasManySetAssociationsMixin<UpVote, number>
  declare addVote: HasManyAddAssociationMixin<UpVote, number>
  declare addVotes: HasManyAddAssociationsMixin<UpVote, number>
  declare createVote: HasManyCreateAssociationMixin<UpVote>
  declare removeVote: HasManyRemoveAssociationMixin<UpVote, number>
  declare removeVotes: HasManyRemoveAssociationsMixin<UpVote, number>
  declare hasVote: HasManyHasAssociationMixin<UpVote, number>
  declare hasVotes: HasManyHasAssociationsMixin<UpVote, number>
  declare countVotes: HasManyCountAssociationsMixin

  declare static associations: {
    comments: Association<Blog, Comment>
    votes: Association<Blog, UpVote>
  }

  static initModel(sequelize: Sequelize): typeof Blog {
    Blog.init(
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
          defaultValue: 0,
        },
        downVote: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        averageVote: {
          type: DataTypes.FLOAT,
          defaultValue: 0.0,
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
