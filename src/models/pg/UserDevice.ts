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
import ModelPgConstant from '@/constants/model.pg.constant'

type UserDeviceAssociations = 'user'

export class UserDeviceSession extends Model<
  InferAttributes<UserDeviceSession, { omit: UserDeviceAssociations }>,
  InferCreationAttributes<UserDeviceSession, { omit: UserDeviceAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare userId: CreationOptional<uuid>
  declare fcmToken: CreationOptional<string>
  declare deviceId: CreationOptional<string>
  declare ua: CreationOptional<object>
  declare ipAddress: CreationOptional<string>
  declare lastSession: CreationOptional<string>
  declare secretKey: CreationOptional<string>
  declare refreshToken: CreationOptional<string>
  declare createdAt: CreationOptional<Date>
  declare expiredAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // UserDevice belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<UserDeviceSession, User>
  }

  static initModel(sequelize: Sequelize): typeof UserDeviceSession {
    UserDeviceSession.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        ipAddress: {
          type: DataTypes.STRING(255),
        },
        fcmToken: {
          type: DataTypes.STRING(255),
        },
        deviceId: {
          type: DataTypes.STRING(255),
        },
        ua: {
          type: DataTypes.JSON,
        },
        secretKey: {
          type: DataTypes.STRING(255),
        },
        refreshToken: {
          type: DataTypes.STRING(255),
        },
        lastSession: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        expiredAt: {
          type: DataTypes.DATE,
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
        tableName: ModelPgConstant.USER_DEVICE,
      },
    )

    return UserDeviceSession
  }
}
