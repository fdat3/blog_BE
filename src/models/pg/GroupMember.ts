import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Group } from './Group'
import type { GroupMemberSetting } from './GroupMemberSetting'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'
// import { GROUP_ROLE } from '@/interfaces/group.interface'

type GroupMemberAssociations = 'group' | 'user' | 'settings'

export class GroupMember extends Model<
  InferAttributes<GroupMember, { omit: GroupMemberAssociations }>,
  InferCreationAttributes<GroupMember, { omit: GroupMemberAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare groupId: CreationOptional<uuid>
  declare userId: CreationOptional<uuid>
  declare role: CreationOptional<'OWNER' | 'MEMBER'>
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
  declare settings?: CreationOptional<NonAttribute<GroupMemberSetting>>
  declare getSettings: HasOneGetAssociationMixin<GroupMemberSetting>
  declare setSettings: HasOneSetAssociationMixin<GroupMemberSetting, string>
  declare createSettings: HasOneCreateAssociationMixin<GroupMemberSetting>

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
