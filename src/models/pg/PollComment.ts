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
  Sequelize
} from 'sequelize'
import type { Poll } from './Poll'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollCommentAssociations = 'poll' | 'parent'

export class PollComment extends Model<
  InferAttributes<PollComment, {omit: PollCommentAssociations}>,
  InferCreationAttributes<PollComment, {omit: PollCommentAssociations}>
> {
  declare id: CreationOptional<string>
  declare pollId: string | null
  declare userId: string | null
  declare content: string | null
  declare image: string | null
  declare hashtag: string[] | null
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
  
  declare static associations: {
    poll: Association<PollComment, Poll>,
    parent: Association<PollComment, PollComment>
  }

  static initModel(sequelize: Sequelize): typeof PollComment {
    PollComment.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      pollId: {
        type: DataTypes.UUID,
      },
      userId: {
        type: DataTypes.UUID,
      },
      content: {
        type: DataTypes.TEXT
      },
      image: {
        type: DataTypes.STRING(255)
      },
      hashtag: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      parentId: {
        type: DataTypes.UUID,
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
      tableName: ModelPgConstant.POLL_COMMENT
    })
    
    return PollComment
  }
}