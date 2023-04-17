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

type HideCommentAssociations = 'comment'

export class HideComment extends Model<
  InferAttributes<HideComment, { omit: HideCommentAssociations }>,
  InferCreationAttributes<HideComment, { omit: HideCommentAssociations }>
> {
  declare id: CreationOptional<string>
  declare commentId: string | null
  declare reason: string | null
  declare deletedAt: Date | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // HideComment belongsTo PollComment (as Comment)
  declare comment?: NonAttribute<PollComment>
  declare getComment: BelongsToGetAssociationMixin<PollComment>
  declare setComment: BelongsToSetAssociationMixin<PollComment, string>
  declare createComment: BelongsToCreateAssociationMixin<PollComment>

  declare static associations: {
    comment: Association<HideComment, PollComment>
  }

  static initModel(sequelize: Sequelize): typeof HideComment {
    HideComment.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        commentId: {
          type: DataTypes.UUID,
        },
        reason: {
          type: DataTypes.TEXT,
        },
        deletedAt: {
          type: DataTypes.DATE,
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

    return HideComment
  }
}
