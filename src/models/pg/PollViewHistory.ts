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
import type { User } from './User'

type PollViewHistoryAssociations = 'user' | 'poll'

export class PollViewHistory extends Model<
  InferAttributes<PollViewHistory, { omit: PollViewHistoryAssociations }>,
  InferCreationAttributes<
    PollViewHistory,
    { omit: PollViewHistoryAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare userId: CreationOptional<string>
  declare pollId: CreationOptional<string>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // PollViewHistory belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // PollViewHistory belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>

  declare static associations: {
    user: Association<PollViewHistory, User>
    poll: Association<PollViewHistory, Poll>
  }

  static initModel(sequelize: Sequelize): typeof PollViewHistory {
    PollViewHistory.init(
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

    return PollViewHistory
  }
}
