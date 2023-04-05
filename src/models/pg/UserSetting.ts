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
import ModelPgConstant from '@/constants/model.pg.constant'

type UserSettingAssociations = 'user'

export class UserSetting extends Model<
  InferAttributes<UserSetting, { omit: UserSettingAssociations }>,
  InferCreationAttributes<UserSetting, { omit: UserSettingAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare setting_1: string | null
  declare setting_2: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // UserSetting belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<UserSetting, User>
  }

  static initModel(sequelize: Sequelize): typeof UserSetting {
    UserSetting.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        setting_1: {
          type: DataTypes.BOOLEAN,
        },
        setting_2: {
          type: DataTypes.BOOLEAN,
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
        tableName: ModelPgConstant.USER_SETTING,
      },
    )

    return UserSetting
  }
}
