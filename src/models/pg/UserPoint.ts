import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { User } from './User'

type UserPointAssociations = 'user'

export class UserPoint extends Model<
  InferAttributes<UserPoint, { omit: UserPointAssociations }>,
  InferCreationAttributes<UserPoint, { omit: UserPointAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare totalPoint: number | null
  declare deletedAt: Date | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // UserPoint belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<UserPoint, User>
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
