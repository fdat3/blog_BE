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
import type { PollComment } from './PollComment'
import type { User } from './User'

type PollCommentMentionAssociations = 'comment' | 'user' | 'mentioned'

export class PollCommentMention extends Model<
  InferAttributes<PollCommentMention, { omit: PollCommentMentionAssociations }>,
  InferCreationAttributes<
    PollCommentMention,
    { omit: PollCommentMentionAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare mentionedId: string | null
  declare pollCommentId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // PollCommentMention belongsTo PollComment (as Comment)
  declare comment?: NonAttribute<PollComment>
  declare getComment: BelongsToGetAssociationMixin<PollComment>
  declare setComment: BelongsToSetAssociationMixin<PollComment, string>
  declare createComment: BelongsToCreateAssociationMixin<PollComment>

  // PollCommentMention belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // PollCommentMention belongsTo User (as Mentioned)
  declare mentioned?: NonAttribute<User>
  declare getMentioned: BelongsToGetAssociationMixin<User>
  declare setMentioned: BelongsToSetAssociationMixin<User, string>
  declare createMentioned: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    comment: Association<PollCommentMention, PollComment>
    user: Association<PollCommentMention, User>
    mentioned: Association<PollCommentMention, User>
  }

  static initModel(sequelize: Sequelize): typeof PollCommentMention {
    PollCommentMention.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        mentionedId: {
          type: DataTypes.UUID,
        },
        pollCommentId: {
          type: DataTypes.UUID,
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

    return PollCommentMention
  }
}
