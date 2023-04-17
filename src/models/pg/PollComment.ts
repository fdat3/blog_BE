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
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { HideComment } from './HideComment'
import type { Like } from './Like'
import type { Poll } from './Poll'
import type { PollCommentHashtag } from './PollCommentHashtag'
import type { PollCommentMention } from './PollCommentMention'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollCommentAssociations =
  | 'poll'
  | 'parent'
  | 'mentions'
  | 'hashtags'
  | 'likes'
  | 'user'
  | 'hideComment'

export class PollComment extends Model<
  InferAttributes<PollComment, { omit: PollCommentAssociations }>,
  InferCreationAttributes<PollComment, { omit: PollCommentAssociations }>
> {
  declare id: CreationOptional<string>
  declare pollId: string | null
  declare userId: string | null
  declare content: string | null
  declare image: string | null
  declare parentId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // PollComment belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>

  // PollComment belongsTo PollComment (as Parent)
  declare parent?: NonAttribute<PollComment>
  declare getParent: BelongsToGetAssociationMixin<PollComment>
  declare setParent: BelongsToSetAssociationMixin<PollComment, string>
  declare createParent: BelongsToCreateAssociationMixin<PollComment>

  // PollComment hasMany PollCommentMention (as Mentions)
  declare mentions?: NonAttribute<PollCommentMention[]>
  declare getMentions: HasManyGetAssociationsMixin<PollCommentMention>
  declare setMentions: HasManySetAssociationsMixin<PollCommentMention, string>
  declare addMention: HasManyAddAssociationMixin<PollCommentMention, string>
  declare addMentions: HasManyAddAssociationsMixin<PollCommentMention, string>
  declare createMention: HasManyCreateAssociationMixin<PollCommentMention>
  declare removeMention: HasManyRemoveAssociationMixin<
    PollCommentMention,
    string
  >
  declare removeMentions: HasManyRemoveAssociationsMixin<
    PollCommentMention,
    string
  >
  declare hasMention: HasManyHasAssociationMixin<PollCommentMention, string>
  declare hasMentions: HasManyHasAssociationsMixin<PollCommentMention, string>
  declare countMentions: HasManyCountAssociationsMixin

  // PollComment hasMany PollCommentHashtag (as Hashtags)
  declare hashtags?: NonAttribute<PollCommentHashtag[]>
  declare getHashtags: HasManyGetAssociationsMixin<PollCommentHashtag>
  declare setHashtags: HasManySetAssociationsMixin<PollCommentHashtag, string>
  declare addHashtag: HasManyAddAssociationMixin<PollCommentHashtag, string>
  declare addHashtags: HasManyAddAssociationsMixin<PollCommentHashtag, string>
  declare createHashtag: HasManyCreateAssociationMixin<PollCommentHashtag>
  declare removeHashtag: HasManyRemoveAssociationMixin<
    PollCommentHashtag,
    string
  >
  declare removeHashtags: HasManyRemoveAssociationsMixin<
    PollCommentHashtag,
    string
  >
  declare hasHashtag: HasManyHasAssociationMixin<PollCommentHashtag, string>
  declare hasHashtags: HasManyHasAssociationsMixin<PollCommentHashtag, string>
  declare countHashtags: HasManyCountAssociationsMixin

  // PollComment hasMany Like (as Likes)
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

  // PollComment belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // PollComment hasOne HideComment (as HideComment)
  declare hideComment?: NonAttribute<HideComment>
  declare getHideComment: HasOneGetAssociationMixin<HideComment>
  declare setHideComment: HasOneSetAssociationMixin<HideComment, string>
  declare createHideComment: HasOneCreateAssociationMixin<HideComment>

  declare static associations: {
    poll: Association<PollComment, Poll>
    parent: Association<PollComment, PollComment>
    mentions: Association<PollComment, PollCommentMention>
    hashtags: Association<PollComment, PollCommentHashtag>
    likes: Association<PollComment, Like>
    user: Association<PollComment, User>
    hideComment: Association<PollComment, HideComment>
  }

  static initModel(sequelize: Sequelize): typeof PollComment {
    PollComment.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        pollId: {
          type: DataTypes.UUID,
        },
        userId: {
          type: DataTypes.UUID,
        },
        content: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING(255),
        },
        parentId: {
          type: DataTypes.UUID,
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
        tableName: ModelPgConstant.POLL_COMMENT,
      },
    )

    return PollComment
  }
}
