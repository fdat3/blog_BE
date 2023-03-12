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
import type { Poll } from './Poll'
import type { PollCommentHashtag } from './PollCommentHashtag'
import type { PollMention } from './PollMention'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollCommentAssociations = 'poll' | 'parent' | 'mentions' | 'hashtag'

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

  // PollComment hasMany PollMention (as Mentions)
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

  // PollComment belongsTo PollCommentHashtag (as Hashtags)
  declare hashtag?: NonAttribute<PollCommentHashtag>
  declare getHashtag: BelongsToGetAssociationMixin<PollCommentHashtag>
  declare setHashtag: BelongsToSetAssociationMixin<PollCommentHashtag, string>
  declare createHashtag: BelongsToCreateAssociationMixin<PollCommentHashtag>

  declare static associations: {
    poll: Association<PollComment, Poll>
    parent: Association<PollComment, PollComment>
    mentions: Association<PollComment, PollMention>
    hashtag: Association<PollComment, PollCommentHashtag>
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
