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
import type { UserPoint } from './UserPoint'

type UserPointHistoryAssociations = 'parent'

export class UserPointHistory extends Model<
  InferAttributes<UserPointHistory, { omit: UserPointHistoryAssociations }>,
  InferCreationAttributes<
    UserPointHistory,
    { omit: UserPointHistoryAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare userPointId: string | null
  declare point: number | null
  declare type: 'WITHDRAW' | 'GAME' | 'DAILY_ATTENDANCE' | null
  declare deletedAt: CreationOptional<Date>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // UserPointHistory belongsTo UserPoint (as Parent)
  declare parent?: NonAttribute<UserPoint>
  declare getParent: BelongsToGetAssociationMixin<UserPoint>
  declare setParent: BelongsToSetAssociationMixin<UserPoint, string>
  declare createParent: BelongsToCreateAssociationMixin<UserPoint>

  declare static associations: {
    parent: Association<UserPointHistory, UserPoint>
  }

  static initModel(sequelize: Sequelize): typeof UserPointHistory {
    UserPointHistory.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userPointId: {
          type: DataTypes.UUID,
        },
        point: {
          type: DataTypes.INTEGER,
        },
        type: {
          type: DataTypes.ENUM('WITHDRAW', 'GAME', 'DAILY_ATTENDANCE'),
        },
        deletedAt: {
          type: DataTypes.DATE,
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

    return UserPointHistory
  }
}
