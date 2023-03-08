import {
  Association,
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
  Sequelize
} from 'sequelize'
import type { Block } from './Block'
import type { Mbti } from './Mbti'
import type { Poll } from './Poll'
import type { PollAnswer } from './PollAnswer'
import type { PollAnswerChosen } from './PollAnswerChosen'
import type { PollComment } from './PollComment'
import type { UserDevice } from './UserDevice'
import ModelPgConstant from '@/constants/model.pg.constant'

type UserAssociations = 'mbti' |
  'devices' |
  // 'blockers' |
  // 'blockeds' |
  'polls' |
  'pollAnswers' |
  'pollChosens' |
  'pollComments'

export class User extends Model<
  InferAttributes<User, {omit: UserAssociations}>,
  InferCreationAttributes<User, {omit: UserAssociations}>
> {
  declare id: CreationOptional<uuid>
  declare fullname: string
  declare password: string
  declare dob: Date | null
  declare username: string
  declare email: string | null
  declare phone: string | null
  declare inviteCode: string | null
  declare refCode: string | null
  declare gender: string | null
  declare instagram: string | null
  declare mbtiId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // User hasOne Mbti (as Mbti)
  declare mbti?: NonAttribute<Mbti>
  declare getMbti: HasOneGetAssociationMixin<Mbti>
  declare setMbti: HasOneSetAssociationMixin<Mbti, number>
  declare createMbti: HasOneCreateAssociationMixin<Mbti>
  
  // User hasMany UserDevice (as Devices)
  declare devices?: NonAttribute<UserDevice[]>
  declare getDevices: HasManyGetAssociationsMixin<UserDevice>
  declare setDevices: HasManySetAssociationsMixin<UserDevice, number>
  declare addDevice: HasManyAddAssociationMixin<UserDevice, number>
  declare addDevices: HasManyAddAssociationsMixin<UserDevice, number>
  declare createDevice: HasManyCreateAssociationMixin<UserDevice>
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
  declare removePollChosen: HasManyRemoveAssociationMixin<PollAnswerChosen, number>
  declare removePollChosens: HasManyRemoveAssociationsMixin<PollAnswerChosen, number>
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
  declare removePollComments: HasManyRemoveAssociationsMixin<PollComment, string>
  declare hasPollComment: HasManyHasAssociationMixin<PollComment, string>
  declare hasPollComments: HasManyHasAssociationsMixin<PollComment, string>
  declare countPollComments: HasManyCountAssociationsMixin
  
  declare static associations: {
    mbti: Association<User, Mbti>,
    devices: Association<User, UserDevice>,
    blockers: Association<User, Block>,
    blockeds: Association<User, Block>,
    polls: Association<User, Poll>,
    pollAnswers: Association<User, PollAnswer>,
    pollChosens: Association<User, PollAnswerChosen>,
    pollComments: Association<User, PollComment>
  }

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      fullname: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      dob: {
        type: DataTypes.DATE
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING(15),
        unique: true
      },
      inviteCode: {
        type: DataTypes.STRING(20),
        unique: true
      },
      refCode: {
        type: DataTypes.STRING(20),
        unique: true
      },
      gender: {
        type: DataTypes.STRING(10)
      },
      instagram: {
        type: DataTypes.STRING(100)
      },
      mbtiId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
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
      tableName: ModelPgConstant.USER_MODEL
    })
    
    return User
  }
}