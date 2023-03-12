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
import type { PollCategory } from './PollCategory'
import type { PollComment } from './PollComment'
import type { PollHashtag } from './PollHashtag'
import type { PollMention } from './PollMention'
import type { ReportPoll } from './ReportPoll'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollAssociations =
  | 'user'
  | 'category'
  | 'report'
  | 'comments'
  | 'pollHashtags'
  | 'mentions'

export class Poll extends Model<
  InferAttributes<Poll, { omit: PollAssociations }>,
  InferCreationAttributes<Poll, { omit: PollAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare categoryId: string | null
  declare title: string | null
  declare description: string | null
  declare image: string | null
  declare canAddNewAnswer: boolean | null
  declare anonymousPoll: boolean | null
  declare viewCount: number | null
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

  // Poll belongsTo ReportPoll (as Reports)
  declare report?: NonAttribute<ReportPoll>
  declare getReport: BelongsToGetAssociationMixin<ReportPoll>
  declare setReport: BelongsToSetAssociationMixin<ReportPoll, number>
  declare createReport: BelongsToCreateAssociationMixin<ReportPoll>

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
  declare pollHashtags?: NonAttribute<PollHashtag[]>
  declare getPollHashtags: HasManyGetAssociationsMixin<PollHashtag>
  declare setPollHashtags: HasManySetAssociationsMixin<PollHashtag, string>
  declare addPollHashtag: HasManyAddAssociationMixin<PollHashtag, string>
  declare addPollHashtags: HasManyAddAssociationsMixin<PollHashtag, string>
  declare createPollHashtag: HasManyCreateAssociationMixin<PollHashtag>
  declare removePollHashtag: HasManyRemoveAssociationMixin<PollHashtag, string>
  declare removePollHashtags: HasManyRemoveAssociationsMixin<
    PollHashtag,
    string
  >
  declare hasPollHashtag: HasManyHasAssociationMixin<PollHashtag, string>
  declare hasPollHashtags: HasManyHasAssociationsMixin<PollHashtag, string>
  declare countPollHashtags: HasManyCountAssociationsMixin

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

  declare static associations: {
    user: Association<Poll, User>
    category: Association<Poll, PollCategory>
    report: Association<Poll, ReportPoll>
    comments: Association<Poll, PollComment>
    pollHashtags: Association<Poll, PollHashtag>
    mentions: Association<Poll, PollMention>
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
          defaultValue: DataTypes.UUIDV4,
        },
        categoryId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
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
        },
        anonymousPoll: {
          type: DataTypes.BOOLEAN,
        },
        viewCount: {
          type: DataTypes.BIGINT,
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
