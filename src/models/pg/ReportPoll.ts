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
import type { Poll } from './Poll'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

export enum EReportType {
  MISLEADING_OR_SCAM = 'MISLEADING_OR_SCAM',
  SEXUALLY_INAPPROPRIATE = 'SEXUALLY_INAPPROPRIATE',
  OFFENSIVE = 'OFFENSIVE',
  VIOLENCE = 'VIOLENCE',
  FAKE_ADS_TO_BE_SOMEONE_ELSE = 'FAKE_ADS_TO_BE_SOMEONE_ELSE',
  PROHIBITED_CONTENT = 'PROHIBITED_CONTENT',
  SPAM = 'SPAM',
  FALSE_NEWS = 'FALSE_NEWS',
  OTHER = 'OTHER',
}

export type TReportType = keyof typeof EReportType

type ReportPollAssociations = 'user' | 'poll'
export class ReportPoll extends Model<
  InferAttributes<ReportPoll, { omit: ReportPollAssociations }>,
  InferCreationAttributes<ReportPoll, { omit: ReportPollAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare pollId: CreationOptional<uuid>
  declare userId: CreationOptional<uuid>
  declare reason_type: CreationOptional<TReportType>
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
    user: Association<ReportPoll, User>
    poll: Association<ReportPoll, Poll>
  }

  static initModel(sequelize: Sequelize): typeof ReportPoll {
    ReportPoll.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        pollId: {
          type: DataTypes.UUID,
        },
        userId: {
          type: DataTypes.UUID,
        },
        reason_type: {
          type: DataTypes.ENUM({
            values: Object.values(EReportType as Record<string, string>), // Auto generate enum value as records
          }),
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
        tableName: ModelPgConstant.REPORT_POLL,
      },
    )

    return ReportPoll
  }
}
