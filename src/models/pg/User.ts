import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Mbti } from './Mbti'
import type { Poll } from './Poll'
import type { PollAnswer } from './PollAnswer'
import type { PollAnswerChosen } from './PollAnswerChosen'
import type { ReportUser } from './ReportUser'
import type { PollComment } from './PollComment'
import type { UserDevice } from './UserDevice'
import ModelPgConstant from '@/constants/model.pg.constant'
import { HookReturn } from 'sequelize/types/hooks'
import UserUtils from '@/utils/user.utils'

type UserAssociations =
  | 'ref'
  | 'mbti'
  | 'devices'
  // 'blockers' |
  // 'blockeds' |
  | 'polls'
  | 'pollAnswers'
  | 'pollChosens'
  | 'pollComments'
  | 'reports'
  | 'isReporteds'

export class User extends Model<
  InferAttributes<User, { omit: UserAssociations }>,
  InferCreationAttributes<User, { omit: UserAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare fullname: string
  declare password: CreationOptional<string>
  declare dob: CreationOptional<Date>
  declare username: CreationOptional<string>
  declare email: CreationOptional<string>
  declare phone: CreationOptional<string>
  declare inviteCode: CreationOptional<string>
  declare refUser: CreationOptional<uuid>
  declare gender: string | null
  declare instagram: string | null
  declare mbtiId: CreationOptional<string>
  declare isAdmin: CreationOptional<boolean>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // User hasOne Reference User (as refUser)
  declare ref?: NonAttribute<User>
  declare getRefUser: HasOneGetAssociationMixin<User>
  declare setRefUser: CreationOptional<HasOneSetAssociationMixin<User, uuid>>
  declare createRefUser: CreationOptional<HasOneCreateAssociationMixin<User>>

  // User belongsTo Mbti (as mbti)
  declare mbti: NonAttribute<Mbti>
  declare getMbti: BelongsToGetAssociationMixin<Mbti>
  declare setMbti: BelongsToSetAssociationMixin<Mbti, uuid>

  // User hasMany UserDevice (as Devices)
  declare devices?: NonAttribute<UserDevice[]>
  declare getDevices: HasManyGetAssociationsMixin<UserDevice>
  declare setDevices: CreationOptional<
    HasManySetAssociationsMixin<UserDevice, uuid>
  >
  declare addDevice: CreationOptional<
    HasManyAddAssociationMixin<UserDevice, UserDevice>
  >
  declare addDevices: CreationOptional<
    HasManyAddAssociationsMixin<UserDevice, UserDevice>
  >
  declare createDevice: CreationOptional<
    HasManyCreateAssociationMixin<UserDevice>
  >
  declare removeDevice: HasManyRemoveAssociationMixin<UserDevice, number>
  declare removeDevices: HasManyRemoveAssociationsMixin<UserDevice, number>
  declare hasDevice: HasManyHasAssociationMixin<UserDevice, number>
  declare hasDevices: HasManyHasAssociationsMixin<UserDevice, number>
  declare countDevices: HasManyCountAssociationsMixin

  // User hasMany Block (as Blockers)
  // declare blockers?: NonAttribute<Block[]>
  // declare getBlockers: HasManyGetAssociationsMixin<Block>
  // declare setBlockers: HasManySetAssociationsMixin<Block, string>
  // declare addBlocker: HasManyAddAssociationMixin<Block, string>
  // declare addBlockers: HasManyAddAssociationsMixin<Block, string>
  // declare createBlocker: HasManyCreateAssociationMixin<Block>
  // declare removeBlocker: HasManyRemoveAssociationMixin<Block, string>
  // declare removeBlockers: HasManyRemoveAssociationsMixin<Block, string>
  // declare hasBlocker: HasManyHasAssociationMixin<Block, string>
  // declare hasBlockers: HasManyHasAssociationsMixin<Block, string>
  // declare countBlockers: HasManyCountAssociationsMixin

  // User hasMany Block (as Blocked)
  // declare blockeds?: NonAttribute<Block[]>
  // declare getBlockeds: HasManyGetAssociationsMixin<Block>
  // declare setBlockeds: HasManySetAssociationsMixin<Block, string>
  // declare addBlocked: HasManyAddAssociationMixin<Block, string>
  // declare addBlockeds: HasManyAddAssociationsMixin<Block, string>
  // declare createBlocked: HasManyCreateAssociationMixin<Block>
  // declare removeBlocked: HasManyRemoveAssociationMixin<Block, string>
  // declare removeBlockeds: HasManyRemoveAssociationsMixin<Block, string>
  // declare hasBlocked: HasManyHasAssociationMixin<Block, string>
  // declare hasBlockeds: HasManyHasAssociationsMixin<Block, string>
  // declare countBlockeds: HasManyCountAssociationsMixin

  // User hasMany Poll (as Polls)
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

  // User hasMany PollAnswer (as PollAnswers)
  declare pollAnswers?: NonAttribute<PollAnswer[]>
  declare getPollAnswers: HasManyGetAssociationsMixin<PollAnswer>
  declare setPollAnswers: HasManySetAssociationsMixin<PollAnswer, string>
  declare addPollAnswer: HasManyAddAssociationMixin<PollAnswer, string>
  declare addPollAnswers: HasManyAddAssociationsMixin<PollAnswer, string>
  declare createPollAnswer: HasManyCreateAssociationMixin<PollAnswer>
  declare removePollAnswer: HasManyRemoveAssociationMixin<PollAnswer, string>
  declare removePollAnswers: HasManyRemoveAssociationsMixin<PollAnswer, string>
  declare hasPollAnswer: HasManyHasAssociationMixin<PollAnswer, string>
  declare hasPollAnswers: HasManyHasAssociationsMixin<PollAnswer, string>
  declare countPollAnswers: HasManyCountAssociationsMixin

  // User hasMany PollAnswerChosen (as PollChosen)
  declare pollChosens?: NonAttribute<PollAnswerChosen[]>
  declare getPollChosens: HasManyGetAssociationsMixin<PollAnswerChosen>
  declare setPollChosens: HasManySetAssociationsMixin<PollAnswerChosen, number>
  declare addPollChosen: HasManyAddAssociationMixin<PollAnswerChosen, number>
  declare addPollChosens: HasManyAddAssociationsMixin<PollAnswerChosen, number>
  declare createPollChosen: HasManyCreateAssociationMixin<PollAnswerChosen>
  declare removePollChosen: HasManyRemoveAssociationMixin<
    PollAnswerChosen,
    number
  >
  declare removePollChosens: HasManyRemoveAssociationsMixin<
    PollAnswerChosen,
    number
  >
  declare hasPollChosen: HasManyHasAssociationMixin<PollAnswerChosen, number>
  declare hasPollChosens: HasManyHasAssociationsMixin<PollAnswerChosen, number>
  declare countPollChosens: HasManyCountAssociationsMixin

  // User hasMany PollComment (as PollComments)
  declare pollComments?: NonAttribute<PollComment[]>
  declare getPollComments: HasManyGetAssociationsMixin<PollComment>
  declare setPollComments: HasManySetAssociationsMixin<PollComment, string>
  declare addPollComment: HasManyAddAssociationMixin<PollComment, string>
  declare addPollComments: HasManyAddAssociationsMixin<PollComment, string>
  declare createPollComment: HasManyCreateAssociationMixin<PollComment>
  declare removePollComment: HasManyRemoveAssociationMixin<PollComment, string>
  declare removePollComments: HasManyRemoveAssociationsMixin<
    PollComment,
    string
  >
  declare hasPollComment: HasManyHasAssociationMixin<PollComment, string>
  declare hasPollComments: HasManyHasAssociationsMixin<PollComment, string>
  declare countPollComments: HasManyCountAssociationsMixin

  // User hasMany ReportUser (as Reports)
  declare reports?: NonAttribute<ReportUser[]>
  declare getReports: HasManyGetAssociationsMixin<ReportUser>
  declare setReports: HasManySetAssociationsMixin<ReportUser, string>
  declare addReport: HasManyAddAssociationMixin<ReportUser, string>
  declare addReports: HasManyAddAssociationsMixin<ReportUser, string>
  declare createReport: HasManyCreateAssociationMixin<ReportUser>
  declare removeReport: HasManyRemoveAssociationMixin<ReportUser, string>
  declare removeReports: HasManyRemoveAssociationsMixin<ReportUser, string>
  declare hasReport: HasManyHasAssociationMixin<ReportUser, string>
  declare hasReports: HasManyHasAssociationsMixin<ReportUser, string>
  declare countReports: HasManyCountAssociationsMixin

  // User hasMany ReportUser (as IsReported)
  declare isReporteds?: NonAttribute<ReportUser[]>
  declare getIsReporteds: HasManyGetAssociationsMixin<ReportUser>
  declare setIsReporteds: HasManySetAssociationsMixin<ReportUser, string>
  declare addIsReported: HasManyAddAssociationMixin<ReportUser, string>
  declare addIsReporteds: HasManyAddAssociationsMixin<ReportUser, string>
  declare createIsReported: HasManyCreateAssociationMixin<ReportUser>
  declare removeIsReported: HasManyRemoveAssociationMixin<ReportUser, string>
  declare removeIsReporteds: HasManyRemoveAssociationsMixin<ReportUser, string>
  declare hasIsReported: HasManyHasAssociationMixin<ReportUser, string>
  declare hasIsReporteds: HasManyHasAssociationsMixin<ReportUser, string>
  declare countIsReporteds: HasManyCountAssociationsMixin

  declare static associations: {
    ref: Association<User, User>
    mbti: Association<User, Mbti>
    devices: Association<User, UserDevice>
    // blockers: Association<User, Block>
    // blockeds: Association<User, Block>
    polls: Association<User, Poll>
    pollAnswers: Association<User, PollAnswer>
    pollChosens: Association<User, PollAnswerChosen>
    pollComments: Association<User, PollComment>
    reports: Association<User, ReportUser>
    isReporteds: Association<User, ReportUser>
  }

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        fullname: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        dob: {
          type: DataTypes.DATE,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING(15),
          unique: true,
          allowNull: true,
        },
        inviteCode: {
          type: DataTypes.STRING(20),
          unique: true,
          allowNull: true,
        },
        refUser: {
          type: DataTypes.UUID,
          allowNull: true,
          field: 'ref_user',
          references: {
            model: 'user',
            key: 'id',
          },
        },
        gender: {
          type: DataTypes.STRING(10),
        },
        instagram: {
          type: DataTypes.STRING(100),
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        mbtiId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: 'mbti_id',
          references: {
            model: 'mbti',
            key: 'id',
          },
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
        tableName: ModelPgConstant.USER_MODEL,
        defaultScope: {
          attributes: {
            exclude: ['password', 'mbti_id', 'blocked_id' ],
          },
        },
        scopes: {
          withPassword: {
            attributes: {
              exclude: ['mbti_id', 'blocked_id' ],
            },
          },
        },
        hooks: {
          beforeCreate(attributes: User): HookReturn {
            if (!attributes.inviteCode) {
              attributes.inviteCode = UserUtils.generateInviteCode()
            }
          },
        },
        indexes: [
          {
            unique: true,
            fields: ['email', 'username'],
            using: 'BTREE',
          },
        ],
      },
    )

    return User
  }
}