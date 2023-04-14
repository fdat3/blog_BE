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

export class GroupActivity extends Model<
  InferAttributes<GroupActivity, { omit: GroupActivitiesAssociations }>,
  InferCreationAttributes<GroupActivity, { omit: GroupActivitiesAssociations }>
> {
  declare id: CreationOptional<string>
  declare groupId: string | null
  declare type:
    | 'JOIN_GROUP'
    | 'LEAVE_GROUP'
    | 'CHANGE_GROUP_SETTING'
    | 'NEW_POLL'
    | 'DELETE_POLL'
    | null
  declare deletedAt: Date | null
  declare userId: string | null
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
        type: {
          type: DataTypes.ENUM(
            'JOIN_GROUP',
            'LEAVE_GROUP',
            'CHANGE_GROUP_SETTING',
            'NEW_POLL',
            'DELETE_POLL',
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
      },
    )

    return GroupActivity
  }
}
