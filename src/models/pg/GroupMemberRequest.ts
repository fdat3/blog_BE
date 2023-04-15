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

type GroupMemberRequestAssociations = 'group' | 'user' | 'inviter'

export class GroupMemberRequest extends Model<
  InferAttributes<GroupMemberRequest, { omit: GroupMemberRequestAssociations }>,
  InferCreationAttributes<
    GroupMemberRequest,
    { omit: GroupMemberRequestAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare inviterId: string | null
  declare deletedAt: Date | null
  declare acceptedAt: Date | null
  declare rejectedAt: Date | null
  declare groupId: string | null
  declare status: 'WAITING_APPROVE' | 'APPROVED' | 'REJECTED' | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // GroupMemberRequest belongsTo Group (as Group)
  declare group?: NonAttribute<Group>
  declare getGroup: BelongsToGetAssociationMixin<Group>
  declare setGroup: BelongsToSetAssociationMixin<Group, string>
  declare createGroup: BelongsToCreateAssociationMixin<Group>

  // GroupMemberRequest belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // GroupMemberRequest belongsTo User (as Inviter)
  declare inviter?: NonAttribute<User>
  declare getInviter: BelongsToGetAssociationMixin<User>
  declare setInviter: BelongsToSetAssociationMixin<User, string>
  declare createInviter: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    group: Association<GroupMemberRequest, Group>
    user: Association<GroupMemberRequest, User>
    inviter: Association<GroupMemberRequest, User>
  }

  static initModel(sequelize: Sequelize): typeof GroupMemberRequest {
    GroupMemberRequest.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        inviterId: {
          type: DataTypes.UUID,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
        acceptedAt: {
          type: DataTypes.DATE,
        },
        rejectedAt: {
          type: DataTypes.DATE,
        },
        groupId: {
          type: DataTypes.UUID,
        },
        status: {
          type: DataTypes.ENUM('WAITING_APPROVE', 'APPROVED', 'REJECTED'),
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
        tableName: ModelPgConstant.GROUP_MEMBER_REQUEST,
      },
    )

    return GroupMemberRequest
  }
}
