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
import type { User } from './User'
import type { UserPointHistory } from './UserPointHistory'

type UserPointAssociations = 'user' | 'histories'

export class UserPoint extends Model<
  InferAttributes<UserPoint, { omit: UserPointAssociations }>,
  InferCreationAttributes<UserPoint, { omit: UserPointAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare totalPoint: number | null
  declare deletedAt: CreationOptional<Date>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // UserPoint belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // UserPoint hasMany UserPointHistory (as History)
  declare histories?: NonAttribute<UserPointHistory[]>
  declare getHistories: HasManyGetAssociationsMixin<UserPointHistory>
  declare setHistories: HasManySetAssociationsMixin<UserPointHistory, string>
  declare addHistory: HasManyAddAssociationMixin<UserPointHistory, string>
  declare addHistories: HasManyAddAssociationsMixin<UserPointHistory, string>
  declare createHistory: HasManyCreateAssociationMixin<UserPointHistory>
  declare removeHistory: HasManyRemoveAssociationMixin<UserPointHistory, string>
  declare removeHistories: HasManyRemoveAssociationsMixin<
    UserPointHistory,
    string
  >
  declare hasHistory: HasManyHasAssociationMixin<UserPointHistory, string>
  declare hasHistories: HasManyHasAssociationsMixin<UserPointHistory, string>
  declare countHistories: HasManyCountAssociationsMixin

  declare static associations: {
    user: Association<UserPoint, User>
    histories: Association<UserPoint, UserPointHistory>
  }

  static initModel(sequelize: Sequelize): typeof UserPoint {
    UserPoint.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        totalPoint: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
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
        hooks: {},
      },
    )

    return UserPoint
  }
}
