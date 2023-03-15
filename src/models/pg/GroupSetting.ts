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
import type { Group } from './Group'

type GroupSettingAssociations = 'group'

export class GroupSetting extends Model<
  InferAttributes<GroupSetting, { omit: GroupSettingAssociations }>,
  InferCreationAttributes<GroupSetting, { omit: GroupSettingAssociations }>
> {
  declare id: CreationOptional<string>
  declare groupId: string | null
  declare setting_1: boolean | null
  declare setting_2: boolean | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // GroupSetting belongsTo Group (as Group)
  declare group?: NonAttribute<Group>
  declare getGroup: BelongsToGetAssociationMixin<Group>
  declare setGroup: BelongsToSetAssociationMixin<Group, string>
  declare createGroup: BelongsToCreateAssociationMixin<Group>

  declare static associations: {
    group: Association<GroupSetting, Group>
  }

  static initModel(sequelize: Sequelize): typeof GroupSetting {
    GroupSetting.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        groupId: {
          type: DataTypes.UUID,
        },
        setting_1: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        setting_2: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
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

    return GroupSetting
  }
}
