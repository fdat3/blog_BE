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
import type { Hashtag } from './Hashtag'
import type { PollComment } from './PollComment'

type PollCommentHashtagAssociations = 'pollComment' | 'hashtag'

export class PollCommentHashtag extends Model<
  InferAttributes<PollCommentHashtag, { omit: PollCommentHashtagAssociations }>,
  InferCreationAttributes<
    PollCommentHashtag,
    { omit: PollCommentHashtagAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare pollCommentId: string | null
  declare hashtagId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // PollCommentHashtag belongsTo PollComment (as PollComment)
  declare pollComment?: NonAttribute<PollComment>
  declare getPollComment: BelongsToGetAssociationMixin<PollComment>
  declare setPollComment: BelongsToSetAssociationMixin<PollComment, string>
  declare createPollComment: BelongsToCreateAssociationMixin<PollComment>

  // PollCommentHashtag belongsTo Hashtag (as Hashtag)
  declare hashtag?: NonAttribute<Hashtag>
  declare getHashtag: BelongsToGetAssociationMixin<Hashtag>
  declare setHashtag: BelongsToSetAssociationMixin<Hashtag, string>
  declare createHashtag: BelongsToCreateAssociationMixin<Hashtag>

  declare static associations: {
    pollComment: Association<PollCommentHashtag, PollComment>
    hashtag: Association<PollCommentHashtag, Hashtag>
  }

  static initModel(sequelize: Sequelize): typeof PollCommentHashtag {
    PollCommentHashtag.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        pollCommentId: {
          type: DataTypes.UUID,
        },
        hashtagId: {
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
      },
    )

    return PollCommentHashtag
  }
}
