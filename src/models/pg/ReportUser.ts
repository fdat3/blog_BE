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
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type ReportUserAssociations = 'user' | 'reported'

export class ReportUser extends Model<
  InferAttributes<ReportUser, { omit: ReportUserAssociations }>,
  InferCreationAttributes<ReportUser, { omit: ReportUserAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare reporterId: string | null
  declare reportedId: string | null
  declare reason: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // ReportUser belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // ReportUser hasOne User (as Reported)
  declare reported?: NonAttribute<User>
  declare getReported: HasOneGetAssociationMixin<User>
  declare setReported: HasOneSetAssociationMixin<User, string>
  declare createReported: HasOneCreateAssociationMixin<User>

  declare static associations: {
    user: Association<ReportUser, User>
    reported: Association<ReportUser, User>
  }

  static initModel(sequelize: Sequelize): typeof ReportUser {
    ReportUser.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        reporterId: {
          type: DataTypes.UUID,
        },
        reportedId: {
          type: DataTypes.UUID,
        },
        reason: {
          type: DataTypes.TEXT,
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
        tableName: ModelPgConstant.REPORT_USER,
      },
    )

    return ReportUser
  }
}
