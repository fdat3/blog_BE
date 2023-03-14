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
import type { Like } from './Like'
import type { PollCategory } from './PollCategory'
import type { PollComment } from './PollComment'
import type { PollHashtag } from './PollHashtag'
import type { PollMention } from './PollMention'
import type { ReportPoll } from './ReportPoll'
import type { User } from './User'

type PollAssociations =
  | 'user'
  | 'category'
  | 'reports'
  | 'comments'
  | 'pollHashtags'
  | 'mentions'
  | 'likes'

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
  declare type: 'TEXT' | 'IMAGE' | 'LOCATION' | 'TRENDY_TALK' | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

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

  declare static associations: {
    user: Association<Poll, User>
    category: Association<Poll, PollCategory>
    reports: Association<Poll, ReportPoll>
    comments: Association<Poll, PollComment>
    pollHashtags: Association<Poll, PollHashtag>
    mentions: Association<Poll, PollMention>
    likes: Association<Poll, Like>
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
          defaultValue: true,
        },
        anonymousPoll: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        viewCount: {
          type: DataTypes.BIGINT,
        },
        type: {
          type: DataTypes.ENUM('TEXT', 'IMAGE', 'LOCATION', 'TRENDY_TALK'),
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

    return Poll
  }
}
