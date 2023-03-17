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
import type { Poll } from './Poll'
import type { PollComment } from './PollComment'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type LikeAssociations = 'poll' | 'comment' | 'user'

export class Like extends Model<
  InferAttributes<Like, { omit: LikeAssociations }>,
  InferCreationAttributes<Like, { omit: LikeAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare pollId: string | null
  declare pollCommentId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // Like belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>

  // Like belongsTo PollComment (as Comment)
  declare comment?: NonAttribute<PollComment>
  declare getComment: BelongsToGetAssociationMixin<PollComment>
  declare setComment: BelongsToSetAssociationMixin<PollComment, string>
  declare createComment: BelongsToCreateAssociationMixin<PollComment>

  // Like belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    poll: Association<Like, Poll>
    comment: Association<Like, PollComment>
    user: Association<Like, User>
  }

  static initModel(sequelize: Sequelize): typeof Like {
    Like.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        pollId: {
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
        deletedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: ModelPgConstant.LIKES,
      },
    )

    return Like
  }
}
