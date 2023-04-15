import ModelPgConstant from '@/constants/model.pg.constant'
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
import type { User } from './User'

type GroupActivitiesAssociations = 'group' | 'user'
export enum GROUP_ACTIVITY_ENUM {
  CREATE_GROUP = 'CREATE_GROUP',
  JOIN_GROUP = 'JOIN_GROUP',
  LEAVE_GROUP = 'LEAVE_GROUP',
  CHANGE_GROUP_SETTING = 'CHANGE_GROUP_SETTING',
  NEW_POLL = 'NEW_POLL',
  DELETE_POLL = 'DELETE_POLL',
  INVITE_MEMBER_BY_ADMIN = 'INVITE_MEMBER_BY_ADMIN',
  REMOVE_MEMBER_BY_ADMIN = 'REMOVE_MEMBER_BY_ADMIN',
  INVITE_MEMBER_BY_OWNER = 'INVITE_MEMBER_BY_OWNER',
  REMOVE_MEMBER_BY_OWNER = 'REMOVE_MEMBER_BY_OWNER',
  USER_ACCEPT_INVITATION = 'USER_ACCEPT_INVITATION',
  USER_REJECT_INVITATION = 'USER_REJECT_INVITATION',
  MEMBER_BANNED = 'MEMBER_BANNED',
}

export type GroupActivityActionType =
  | 'CREATE_GROUP'
  | 'JOIN_GROUP'
  | 'LEAVE_GROUP'
  | 'CHANGE_GROUP_SETTING'
  | 'NEW_POLL'
  | 'DELETE_POLL'
  | 'INVITE_MEMBER_BY_ADMIN'
  | 'REMOVE_MEMBER_BY_ADMIN'
  | 'INVITE_MEMBER_BY_OWNER'
  | 'REMOVE_MEMBER_BY_OWNER'
  | 'USER_ACCEPT_INVITATION' // It's mean user is not a member of group
  | 'USER_REJECT_INVITATION' // It's mean user is not a member of group
  | 'MEMBER_BANNED'
  | null
export class GroupActivity extends Model<
  InferAttributes<GroupActivity, { omit: GroupActivitiesAssociations }>,
  InferCreationAttributes<GroupActivity, { omit: GroupActivitiesAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare groupId: CreationOptional<uuid>
  declare action: CreationOptional<GroupActivityActionType>
  declare deletedAt: CreationOptional<Date>
  declare userId: CreationOptional<uuid>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // GroupActivity belongsTo Group (as Group)
  declare group?: NonAttribute<Group>
  declare getGroup: BelongsToGetAssociationMixin<Group>
  declare setGroup: BelongsToSetAssociationMixin<Group, string>
  declare createGroup: BelongsToCreateAssociationMixin<Group>

  // GroupActivity belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    group: Association<GroupActivity, Group>
    user: Association<GroupActivity, User>
  }

  static initModel(sequelize: Sequelize): typeof GroupActivity {
    GroupActivity.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        groupId: {
          type: DataTypes.UUID,
        },
        action: {
          type: DataTypes.ENUM(
            'CREATE_GROUP',
            'JOIN_GROUP',
            'LEAVE_GROUP',
            'CHANGE_GROUP_SETTING',
            'NEW_POLL',
            'DELETE_POLL',
            'INVITE_MEMBER_BY_ADMIN',
            'REMOVE_MEMBER_BY_ADMIN',
            'INVITE_MEMBER_BY_OWNER',
            'REMOVE_MEMBER_BY_OWNER',
            'USER_ACCEPT_INVITATION', // It's mean user is not a member of group
            'USER_REJECT_INVITATION', // It's mean user is not a member of group
            'MEMBER_BANNED',
          ),
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
        userId: {
          type: DataTypes.UUID,
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
        tableName: ModelPgConstant.GROUP_ACTIVITY,
      },
    )

    return GroupActivity
  }
}
