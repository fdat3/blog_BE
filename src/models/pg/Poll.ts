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
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Group } from './Group'
import type { Like } from './Like'
import type { PollCategory } from './PollCategory'
import type { PollComment } from './PollComment'
import type { PollHashtag } from './PollHashtag'
import type { PollMention } from './PollMention'
import type { ReportPoll } from './ReportPoll'
import type { PollHandlePriority } from './PollHandlePriority'
import type { PollUpPackageUserBought } from './PollUpPackageUserBought'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'
import { PollAnswer } from '@/models/pg/PollAnswer'
import { PollEntity } from '@/models/pg/PollEntity'
import { PollVotes } from './PollVotes'
import { PollViewHistory } from './PollViewHistory'

type PollAssociations =
  | 'user'
  | 'category'
  | 'reports'
  | 'comments'
  | 'hashtags'
  | 'mentions'
  | 'likes'
  | 'answers'
  | 'entities'
  | 'group'
  | 'handlePriorities'
  | 'votes'
  | 'appliedPackages'
  | 'viewHistories'

export class Poll extends Model<
  InferAttributes<Poll, { omit: PollAssociations }>,
  InferCreationAttributes<Poll, { omit: PollAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: CreationOptional<uuid>
  declare categoryId: CreationOptional<uuid>
  declare groupId: CreationOptional<uuid>
  declare title: string | null
  declare description: string | null
  declare image: string | null
  declare canAddNewAnswer: CreationOptional<boolean>
  declare anonymousPoll: CreationOptional<boolean>
  declare viewCount: CreationOptional<number>
  // Declare voteCount with Virtual type
  // declare voteCount: NonAttribute<any>
  // declare commentCount: NonAttribute<any>
  // declare likeCount: NonAttribute<any>
  declare type:
    | 'TEXT'
    | 'IMAGE_A'
    | 'IMAGE_B'
    | 'SCHEDULE'
    | 'TRENDY_TALK'
    | null
  declare isUsedPullUp: CreationOptional<boolean>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // Poll belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // Poll belongsTo PollCategory (as Category)
  declare category?: NonAttribute<PollCategory>
  declare getCategory: BelongsToGetAssociationMixin<PollCategory>
  declare setCategory: BelongsToSetAssociationMixin<PollCategory, string>
  declare createCategory: BelongsToCreateAssociationMixin<PollCategory>

  // Poll hasMany ReportPoll (as Reports)
  declare reports?: NonAttribute<ReportPoll[]>
  declare getReports: HasManyGetAssociationsMixin<ReportPoll>
  declare setReports: HasManySetAssociationsMixin<ReportPoll, string>
  declare addReport: HasManyAddAssociationMixin<ReportPoll, string>
  declare addReports: HasManyAddAssociationsMixin<ReportPoll, string>
  declare createReport: HasManyCreateAssociationMixin<ReportPoll>
  declare removeReport: HasManyRemoveAssociationMixin<ReportPoll, string>
  declare removeReports: HasManyRemoveAssociationsMixin<ReportPoll, string>
  declare hasReport: HasManyHasAssociationMixin<ReportPoll, string>
  declare hasReports: HasManyHasAssociationsMixin<ReportPoll, string>
  declare countReports: HasManyCountAssociationsMixin

  // Poll hasMany PollComment (as Comments)
  declare comments?: NonAttribute<PollComment[]>
  declare getComments: HasManyGetAssociationsMixin<PollComment>
  declare setComments: HasManySetAssociationsMixin<PollComment, string>
  declare addComment: HasManyAddAssociationMixin<PollComment, string>
  declare addComments: HasManyAddAssociationsMixin<PollComment, string>
  declare createComment: HasManyCreateAssociationMixin<PollComment>
  declare removeComment: HasManyRemoveAssociationMixin<PollComment, string>
  declare removeComments: HasManyRemoveAssociationsMixin<PollComment, string>
  declare hasComment: HasManyHasAssociationMixin<PollComment, string>
  declare hasComments: HasManyHasAssociationsMixin<PollComment, string>
  declare countComments: HasManyCountAssociationsMixin

  // Poll hasMany PollHashtag (as PollHashtag)
  declare hashtags?: NonAttribute<PollHashtag[]>
  declare getHashtags: HasManyGetAssociationsMixin<PollHashtag>
  declare setHashtags: HasManySetAssociationsMixin<PollHashtag, string>
  declare addHashtag: HasManyAddAssociationMixin<PollHashtag, string>
  declare addHashtags: HasManyAddAssociationsMixin<PollHashtag, string>
  declare createHashtag: HasManyCreateAssociationMixin<PollHashtag>
  declare removeHashtag: HasManyRemoveAssociationMixin<PollHashtag, string>
  declare removeHashtags: HasManyRemoveAssociationsMixin<PollHashtag, string>
  declare hasHashtag: HasManyHasAssociationMixin<PollHashtag, string>
  declare hasHashtags: HasManyHasAssociationsMixin<PollHashtag, string>
  declare countHashtags: HasManyCountAssociationsMixin

  // Poll hasMany PollMention (as Mentions)
  declare mentions?: NonAttribute<PollMention[]>
  declare getMentions: HasManyGetAssociationsMixin<PollMention>
  declare setMentions: HasManySetAssociationsMixin<PollMention, string>
  declare addMention: HasManyAddAssociationMixin<PollMention, string>
  declare addMentions: HasManyAddAssociationsMixin<PollMention, string>
  declare createMention: HasManyCreateAssociationMixin<PollMention>
  declare removeMention: HasManyRemoveAssociationMixin<PollMention, string>
  declare removeMentions: HasManyRemoveAssociationsMixin<PollMention, string>
  declare hasMention: HasManyHasAssociationMixin<PollMention, string>
  declare hasMentions: HasManyHasAssociationsMixin<PollMention, string>
  declare countMentions: HasManyCountAssociationsMixin

  // Poll hasMany Like (as Likes)
  declare likes?: NonAttribute<Like[]>
  declare getLikes: HasManyGetAssociationsMixin<Like>
  declare setLikes: HasManySetAssociationsMixin<Like, string>
  declare addLike: HasManyAddAssociationMixin<Like, string>
  declare addLikes: HasManyAddAssociationsMixin<Like, string>
  declare createLike: HasManyCreateAssociationMixin<Like>
  declare removeLike: HasManyRemoveAssociationMixin<Like, string>
  declare removeLikes: HasManyRemoveAssociationsMixin<Like, string>
  declare hasLike: HasManyHasAssociationMixin<Like, string>
  declare hasLikes: HasManyHasAssociationsMixin<Like, string>
  declare countLikes: HasManyCountAssociationsMixin

  // Poll hasMany PollAnswer (as Answers)
  declare answers?: NonAttribute<PollAnswer[]>
  declare getAnswers: HasManyGetAssociationsMixin<PollAnswer>
  declare setAnswers: HasManySetAssociationsMixin<PollAnswer, string>
  declare addAnswer: HasManyAddAssociationMixin<PollAnswer, string>
  declare addAnswers: HasManyAddAssociationsMixin<PollAnswer, string>
  declare createAnswer: HasManyCreateAssociationMixin<PollAnswer>
  declare removeAnswer: HasManyRemoveAssociationMixin<PollAnswer, string>
  declare removeAnswers: HasManyRemoveAssociationsMixin<PollAnswer, string>
  declare hasAnswer: HasManyHasAssociationMixin<PollAnswer, string>
  declare hasAnswers: HasManyHasAssociationsMixin<PollAnswer, string>
  declare countAnswers: HasManyCountAssociationsMixin

  // Poll hasMany PollEntity (as Entities)
  declare entities?: NonAttribute<PollEntity[]>
  declare getEntities: HasManyGetAssociationsMixin<PollEntity>
  declare setEntities: HasManySetAssociationsMixin<PollEntity, string>
  declare addEntity: HasManyAddAssociationMixin<PollEntity, string>
  declare addEntities: HasManyAddAssociationsMixin<PollEntity, string>
  declare createEntity: HasManyCreateAssociationMixin<PollEntity>
  declare removeEntity: HasManyRemoveAssociationMixin<PollEntity, string>
  declare removeEntities: HasManyRemoveAssociationsMixin<PollEntity, string>
  declare hasEntity: HasManyHasAssociationMixin<PollEntity, string>
  declare hasEntities: HasManyHasAssociationsMixin<PollEntity, string>
  declare countEntities: HasManyCountAssociationsMixin

  // Poll belongsTo Group (as Group)
  declare group?: NonAttribute<Group>
  declare getGroup: BelongsToGetAssociationMixin<Group>
  declare setGroup: BelongsToSetAssociationMixin<Group, string>
  declare createGroup: BelongsToCreateAssociationMixin<Group>

  // Poll hasMany PollHandlePriority (as HandlePriority)
  declare handlePriorities?: NonAttribute<PollHandlePriority[]>
  declare getHandlePriorities: HasManyGetAssociationsMixin<PollHandlePriority>
  declare setHandlePriorities: HasManySetAssociationsMixin<
    PollHandlePriority,
    string
  >
  declare addHandlePriority: HasManyAddAssociationMixin<
    PollHandlePriority,
    string
  >
  declare addHandlePriorities: HasManyAddAssociationsMixin<
    PollHandlePriority,
    string
  >
  declare createHandlePriority: HasManyCreateAssociationMixin<PollHandlePriority>
  declare removeHandlePriority: HasManyRemoveAssociationMixin<
    PollHandlePriority,
    string
  >
  declare removeHandlePriorities: HasManyRemoveAssociationsMixin<
    PollHandlePriority,
    string
  >
  declare hasHandlePriority: HasManyHasAssociationMixin<
    PollHandlePriority,
    string
  >
  declare hasHandlePriorities: HasManyHasAssociationsMixin<
    PollHandlePriority,
    string
  >
  declare countHandlePriorities: HasManyCountAssociationsMixin

  // Poll hasMany PollVotes (as Votes)
  declare votes?: NonAttribute<PollVotes[]>
  declare getVotes: HasManyGetAssociationsMixin<PollVotes>
  declare setVotes: HasManySetAssociationsMixin<PollVotes, string>
  declare addVote: HasManyAddAssociationMixin<PollVotes, string>
  declare addVotes: HasManyAddAssociationsMixin<PollVotes, string>
  declare createVote: HasManyCreateAssociationMixin<PollVotes>
  declare removeVote: HasManyRemoveAssociationMixin<PollVotes, string>
  declare removeVotes: HasManyRemoveAssociationsMixin<PollVotes, string>
  declare hasVote: HasManyHasAssociationMixin<PollVotes, string>
  declare hasVotes: HasManyHasAssociationsMixin<PollVotes, string>
  declare countVotes: HasManyCountAssociationsMixin

  // Poll hasMany PollUpPackageUserBought (as AppliedPackages)
  declare appliedPackages?: NonAttribute<PollUpPackageUserBought[]>
  declare getAppliedPackages: HasManyGetAssociationsMixin<PollUpPackageUserBought>
  declare setAppliedPackages: HasManySetAssociationsMixin<
    PollUpPackageUserBought,
    string
  >
  declare addAppliedPackage: HasManyAddAssociationMixin<
    PollUpPackageUserBought,
    string
  >
  declare addAppliedPackages: HasManyAddAssociationsMixin<
    PollUpPackageUserBought,
    string
  >
  declare createAppliedPackage: HasManyCreateAssociationMixin<PollUpPackageUserBought>
  declare removeAppliedPackage: HasManyRemoveAssociationMixin<
    PollUpPackageUserBought,
    string
  >
  declare removeAppliedPackages: HasManyRemoveAssociationsMixin<
    PollUpPackageUserBought,
    string
  >
  declare hasAppliedPackage: HasManyHasAssociationMixin<
    PollUpPackageUserBought,
    string
  >
  declare hasAppliedPackages: HasManyHasAssociationsMixin<
    PollUpPackageUserBought,
    string
  >
  declare countAppliedPackages: HasManyCountAssociationsMixin

  // Poll hasMany PollViewHistory (as ViewHistories)
  declare viewHistories?: NonAttribute<PollViewHistory[]>
  declare getViewHistories: HasManyGetAssociationsMixin<PollViewHistory>
  declare setViewHistories: HasManySetAssociationsMixin<PollViewHistory, string>
  declare addViewHistory: HasManyAddAssociationMixin<PollViewHistory, string>
  declare addViewHistories: HasManyAddAssociationsMixin<PollViewHistory, string>
  declare createViewHistory: HasManyCreateAssociationMixin<PollViewHistory>
  declare removeViewHistory: HasManyRemoveAssociationMixin<
    PollViewHistory,
    string
  >
  declare removeViewHistories: HasManyRemoveAssociationsMixin<
    PollViewHistory,
    string
  >
  declare hasViewHistory: HasManyHasAssociationMixin<PollViewHistory, string>
  declare hasViewHistories: HasManyHasAssociationsMixin<PollViewHistory, string>
  declare countViewHistories: HasManyCountAssociationsMixin

  declare static associations: {
    user: Association<Poll, User>
    category: Association<Poll, PollCategory>
    reports: Association<Poll, ReportPoll>
    comments: Association<Poll, PollComment>
    hashtags: Association<Poll, PollHashtag>
    mentions: Association<Poll, PollMention>
    likes: Association<Poll, Like>
    answers: Association<Poll, PollAnswer>
    entities: Association<Poll, PollEntity>
    group: Association<Poll, Group>
    handlePriorities: Association<Poll, PollHandlePriority>
    votes: Association<Poll, PollVotes>
    appliedPackages: Association<Poll, PollUpPackageUserBought>
    viewHistories: Association<Poll, PollViewHistory>
  }

  static initModel(sequelize: Sequelize): typeof Poll {
    Poll.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        categoryId: {
          type: DataTypes.UUID,
        },
        groupId: {
          type: DataTypes.UUID,
        },
        title: {
          type: DataTypes.STRING(100),
        },
        description: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING(200),
        },
        canAddNewAnswer: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        anonymousPoll: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        viewCount: {
          type: DataTypes.BIGINT,
          defaultValue: 0,
        },
        type: {
          type: DataTypes.ENUM(
            'TEXT',
            'IMAGE_A',
            'IMAGE_B',
            'SCHEDULE',
            'TRENDY_TALK',
          ),
          defaultValue: 'TEXT',
        },
        isUsedPullUp: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
        tableName: ModelPgConstant.POLL,
      },
    )

    return Poll
  }
}
