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
import type { GroupMember } from './GroupMember'

type GroupMemberSettingAssociations = 'member'

export class GroupMemberSetting extends Model<
  InferAttributes<GroupMemberSetting, { omit: GroupMemberSettingAssociations }>,
  InferCreationAttributes<
    GroupMemberSetting,
    { omit: GroupMemberSettingAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare groupMemberId: string | null
  declare setting_1: boolean | null
  declare setting_2: boolean | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // GroupMemberSetting belongsTo GroupMember (as Member)
  declare member?: NonAttribute<GroupMember>
  declare getMember: BelongsToGetAssociationMixin<GroupMember>
  declare setMember: BelongsToSetAssociationMixin<GroupMember, string>
  declare createMember: BelongsToCreateAssociationMixin<GroupMember>

  declare static associations: {
    member: Association<GroupMemberSetting, GroupMember>
  }

  static initModel(sequelize: Sequelize): typeof GroupMemberSetting {
    GroupMemberSetting.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        groupMemberId: {
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
      },
      {
        sequelize,
      },
    )

    return GroupMemberSetting
  }
}
