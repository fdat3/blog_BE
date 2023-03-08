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
  Sequelize
} from 'sequelize'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type UserDeviceAssociations = 'user'

export class UserDevice extends Model<
  InferAttributes<UserDevice, {omit: UserDeviceAssociations}>,
  InferCreationAttributes<UserDevice, {omit: UserDeviceAssociations}>
> {
  declare id: CreationOptional<uuid>
  declare userId: string | null
  declare fcmToken: string | null
  declare deviceId: string | null
  declare lastSession: Date | null
  declare loginType: string | null
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
    UserDevice.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
      },
      fcmToken: {
        type: DataTypes.STRING(255)
      },
      deviceId: {
        type: DataTypes.STRING(255)
      },
      lastSession: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      loginType: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: ModelPgConstant.USER_DEVICE
    })
    
    return UserDevice
  }
}