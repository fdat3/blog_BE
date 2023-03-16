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
import type { User } from './User'

type UserDeviceAssociations = 'user'

export class UserDevice extends Model<
  InferAttributes<UserDevice, { omit: UserDeviceAssociations }>,
  InferCreationAttributes<UserDevice, { omit: UserDeviceAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare fcmToken: CreationOptional<string>
  declare deviceId: CreationOptional<string>
  declare lastSession: CreationOptional<string>
  declare loginType: CreationOptional<string>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // UserDevice belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<UserDevice, User>
  }

  static initModel(sequelize: Sequelize): typeof UserDevice {
    UserDevice.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        fcmToken: {
          type: DataTypes.STRING(255),
        },
        deviceId: {
          type: DataTypes.STRING(255),
        },
        lastSession: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        loginType: {
          type: DataTypes.ENUM(
            'NORMAL',
            'APPLE',
            'FACEBOOK',
            'GOOGLE',
            'NAVER',
            'KAKAO',
          ),
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
      },
    )

    return UserDevice
  }
}
