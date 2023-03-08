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
  Sequelize
} from 'sequelize'
import type { Poll } from './Poll'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type ReportPollAssociations = 'user' | 'poll'

export class ReportPoll extends Model<
  InferAttributes<ReportPoll, {omit: ReportPollAssociations}>,
  InferCreationAttributes<ReportPoll, {omit: ReportPollAssociations}>
> {
  declare id: CreationOptional<uuid>
  declare pollId: string | null
  declare userId: string | null
  declare reason: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // ReportPoll belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>
  
  // ReportPoll belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>
  
  declare static associations: {
    user: Association<ReportPoll, User>,
    poll: Association<ReportPoll, Poll>
  }

  static initModel(sequelize: Sequelize): typeof ReportPoll {
    ReportPoll.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      pollId: {
        type: DataTypes.UUID
      },
      userId: {
        type: DataTypes.UUID
      },
      reason: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: ModelPgConstant.REPORT_POLL
    })
    
    return ReportPoll
  }
}