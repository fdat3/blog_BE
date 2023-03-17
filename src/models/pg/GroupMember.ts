import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Group } from './Group'
import type { GroupMemberSetting } from './GroupMemberSetting'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type GroupMemberAssociations = 'group' | 'user' | 'setting'

export class GroupMember extends Model<
  InferAttributes<GroupMember, { omit: GroupMemberAssociations }>,
  InferCreationAttributes<GroupMember, { omit: GroupMemberAssociations }>
> {
  declare id: CreationOptional<string>
  declare groupId: string | null
  declare userId: string | null
  declare role: 'OWNER' | 'MEMBER' | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // GroupMember belongsTo Group (as Group)
  declare group?: NonAttribute<Group>
  declare getGroup: BelongsToGetAssociationMixin<Group>
  declare setGroup: BelongsToSetAssociationMixin<Group, string>
  declare createGroup: BelongsToCreateAssociationMixin<Group>

  // GroupMember belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // GroupMember hasOne GroupMemberSetting (as Settings)
  declare setting?: NonAttribute<GroupMemberSetting>
  declare getSetting: HasOneGetAssociationMixin<GroupMemberSetting>
  declare setSetting: HasOneSetAssociationMixin<GroupMemberSetting, string>
  declare createSetting: HasOneCreateAssociationMixin<GroupMemberSetting>

  declare static associations: {
    group: Association<GroupMember, Group>
    user: Association<GroupMember, User>
    setting: Association<GroupMember, GroupMemberSetting>
  }

  static initModel(sequelize: Sequelize): typeof GroupMember {
    GroupMember.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        groupId: {
          type: DataTypes.UUID,
        },
        userId: {
          type: DataTypes.UUID,
        },
        role: {
          type: DataTypes.ENUM('OWNER', 'MEMBER'),
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
        tableName: ModelPgConstant.GROUP_MEMBERS,
      },
    )

    return GroupMember
  }
}
