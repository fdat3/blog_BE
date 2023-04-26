import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

export class Like extends Model {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare pollId: string | null
  declare pollCommentId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // Like belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<Like, User>
  }

  static initModel(sequelize: Sequelize): typeof Like {
    Like.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        pollId: {
          type: DataTypes.UUID,
        },
        pollCommentId: {
          type: DataTypes.UUID,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: ModelPgConstant.LIKES,
      },
    )

    return Like
  }
}
