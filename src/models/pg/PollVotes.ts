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
import type { PollAnswer } from './PollAnswer'
import type { Poll } from './Poll'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollAnswerChosenAssociations = 'user' | 'pollAnswer' | 'poll'

export class PollVotes extends Model<
  InferAttributes<PollVotes, { omit: PollAnswerChosenAssociations }>,
  InferCreationAttributes<PollVotes, { omit: PollAnswerChosenAssociations }>
> {
  declare id: CreationOptional<string>
  declare pollAnswerId: string | null
  declare pollId: CreationOptional<uuid>
  declare userId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // PollVotes belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // PollVotes belongsTo PollAnswer (as PollAnswer)
  declare pollAnswer?: NonAttribute<PollAnswer>
  declare getPollAnswer: BelongsToGetAssociationMixin<PollAnswer>
  declare setPollAnswer: BelongsToSetAssociationMixin<PollAnswer, string>
  declare createPollAnswer: BelongsToCreateAssociationMixin<PollAnswer>

  // PollVotes belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>

  declare static associations: {
    user: Association<PollVotes, User>
    pollAnswer: Association<PollVotes, PollAnswer>
    poll: Association<PollVotes, Poll>
  }

  static initModel(sequelize: Sequelize): typeof PollVotes {
    PollVotes.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        pollAnswerId: {
          type: DataTypes.UUID,
        },
        pollId: {
          type: DataTypes.UUID,
        },
        userId: {
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
        tableName: ModelPgConstant.POLL_VOTES,
      },
    )

    return PollVotes
  }
}
