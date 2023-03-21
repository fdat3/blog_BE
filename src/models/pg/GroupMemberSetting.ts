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
import ModelPgConstant from '@/constants/model.pg.constant'

type GroupMemberSettingAssociations = 'member'

export class GroupMemberSetting extends Model<
  InferAttributes<GroupMemberSetting, { omit: GroupMemberSettingAssociations }>,
  InferCreationAttributes<
    GroupMemberSetting,
    { omit: GroupMemberSettingAssociations }
  >
> {
  declare id: CreationOptional<uuid>
  declare groupMemberId: CreationOptional<uuid>
  declare setting_1: CreationOptional<boolean>
  declare setting_2: CreationOptional<boolean>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

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
          defaultValue: DataTypes.UUIDV4,
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
        deletedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: ModelPgConstant.GROUP_MEMBERS_SETTING,
      },
    )

    return GroupMemberSetting
  }
}
