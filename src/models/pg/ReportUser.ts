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
import type { User } from './User'

type ReportUserAssociations = 'user' | 'reported'

export class ReportUser extends Model<
  InferAttributes<ReportUser, { omit: ReportUserAssociations }>,
  InferCreationAttributes<ReportUser, { omit: ReportUserAssociations }>
> {
  declare id: CreationOptional<string>
  declare reporterId: string | null
  declare reportedId: string | null
  declare reason: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // ReportUser belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // ReportUser belongsTo User (as Reported)
  declare reported?: NonAttribute<User>
  declare getReported: BelongsToGetAssociationMixin<User>
  declare setReported: BelongsToSetAssociationMixin<User, string>
  declare createReported: BelongsToCreateAssociationMixin<User>

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
      },
      {
        sequelize,
      },
    )

    return ReportUser
  }
}
