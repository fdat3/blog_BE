import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { GroupMember } from './GroupMember'
import type { GroupSetting } from './GroupSetting'
import type { GroupActivity } from './GroupActivity'
import type { User } from './User'
import type { Poll } from './Poll'
import ModelPgConstant from '@/constants/model.pg.constant'

type GroupAssociations =
  | 'user'
  | 'members'
  | 'settings'
  | 'polls'
  | 'activities'

/**
 * Group model
 * isPrivate: true => Not showing in public page
 * isVisible: if true, group is visible to all members else only owner can see
 * Max members in group: 30
 * if Member has been invited by Admin, member join normally, including max members over 30
 * if member is removed by admin, Member can not join again (as banned member)
 */
export class Group extends Model<
  InferAttributes<Group, { omit: GroupAssociations }>,
  InferCreationAttributes<Group, { omit: GroupAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare name: string | null
  declare password: CreationOptional<string>
  declare avatar: CreationOptional<string>
  declare isVisible: CreationOptional<boolean>
  declare isPrivate: CreationOptional<boolean>
  declare ownerId: CreationOptional<uuid>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // Group belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // Group hasMany GroupMember (as Members)
  declare members?: NonAttribute<GroupMember[]>
  declare getMembers: HasManyGetAssociationsMixin<GroupMember>
  declare setMembers: HasManySetAssociationsMixin<GroupMember, string>
  declare addMember: HasManyAddAssociationMixin<GroupMember, string>
  declare addMembers: HasManyAddAssociationsMixin<GroupMember, string>
  declare createMember: HasManyCreateAssociationMixin<GroupMember>
  declare removeMember: HasManyRemoveAssociationMixin<GroupMember, string>
  declare removeMembers: HasManyRemoveAssociationsMixin<GroupMember, string>
  declare hasMember: HasManyHasAssociationMixin<GroupMember, string>
  declare hasMembers: HasManyHasAssociationsMixin<GroupMember, string>
  declare countMembers: HasManyCountAssociationsMixin

  // Group hasOne GroupSetting (as GroupSettings)
  declare settings?: NonAttribute<GroupSetting>
  declare getSetting: HasOneGetAssociationMixin<GroupSetting>
  declare setSetting: HasOneSetAssociationMixin<GroupSetting, string>
  declare createSetting: HasOneCreateAssociationMixin<GroupSetting>

  // Group hasMany Poll (as Polls)
  declare polls?: NonAttribute<Poll[]>
  declare getPolls: HasManyGetAssociationsMixin<Poll>
  declare setPolls: HasManySetAssociationsMixin<Poll, string>
  declare addPoll: HasManyAddAssociationMixin<Poll, string>
  declare addPolls: HasManyAddAssociationsMixin<Poll, string>
  declare createPoll: HasManyCreateAssociationMixin<Poll>
  declare removePoll: HasManyRemoveAssociationMixin<Poll, string>
  declare removePolls: HasManyRemoveAssociationsMixin<Poll, string>
  declare hasPoll: HasManyHasAssociationMixin<Poll, string>
  declare hasPolls: HasManyHasAssociationsMixin<Poll, string>
  declare countPolls: HasManyCountAssociationsMixin

  // Group hasMany GroupActivity (as Activities)
  declare activities?: NonAttribute<GroupActivity[]>
  declare getActivities: HasManyGetAssociationsMixin<GroupActivity>
  declare setActivities: HasManySetAssociationsMixin<GroupActivity, string>
  declare addActivity: HasManyAddAssociationMixin<GroupActivity, string>
  declare addActivities: HasManyAddAssociationsMixin<GroupActivity, string>
  declare createActivity: HasManyCreateAssociationMixin<GroupActivity>
  declare removeActivity: HasManyRemoveAssociationMixin<GroupActivity, string>
  declare removeActivities: HasManyRemoveAssociationsMixin<
    GroupActivity,
    string
  >
  declare hasActivity: HasManyHasAssociationMixin<GroupActivity, string>
  declare hasActivities: HasManyHasAssociationsMixin<GroupActivity, string>
  declare countActivities: HasManyCountAssociationsMixin

  declare static associations: {
    user: Association<Group, User>
    members: Association<Group, GroupMember>
    groupSetting: Association<Group, GroupSetting>
    polls: Association<Group, Poll>
    activities: Association<Group, GroupActivity>
  }

  static initModel(sequelize: Sequelize): typeof Group {
    Group.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING(200),
        },
        password: {
          type: DataTypes.TEXT,
        },
        avatar: {
          type: DataTypes.STRING,
        },
        isVisible: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        isPrivate: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        ownerId: {
          type: DataTypes.UUID,
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
        tableName: ModelPgConstant.GROUP,
        defaultScope: {
          where: {
            isVisible: true,
          },
          attributes: {
            exclude: ['password'],
          },
        },
        scopes: {
          withPassword: {
            where: {
              isVisible: true,
            },
          },
          private: {
            where: {
              isPrivate: true,
            },
            attributes: {
              exclude: ['password'],
            },
          },
          public: {
            where: {
              isPrivate: false,
            },
            attributes: {
              exclude: ['password'],
            },
          },
          all: {},
        },
      },
    )

    return Group
  }
} // end Group
