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
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollAnswerChosenAssociations = 'user' | 'pollAnswer'

export class PollAnswerChosen extends Model<
  InferAttributes<PollAnswerChosen, { omit: PollAnswerChosenAssociations }>,
  InferCreationAttributes<
    PollAnswerChosen,
    { omit: PollAnswerChosenAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare pollAnswerId: string | null
  declare userId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // PollAnswerChosen belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // PollAnswerChosen belongsTo PollAnswer (as PollAnswer)
  declare pollAnswer?: NonAttribute<PollAnswer>
  declare getPollAnswer: BelongsToGetAssociationMixin<PollAnswer>
  declare setPollAnswer: BelongsToSetAssociationMixin<PollAnswer, string>
  declare createPollAnswer: BelongsToCreateAssociationMixin<PollAnswer>

  declare static associations: {
    user: Association<PollAnswerChosen, User>
    pollAnswer: Association<PollAnswerChosen, PollAnswer>
  }

  static initModel(sequelize: Sequelize): typeof PollAnswerChosen {
    PollAnswerChosen.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        pollAnswerId: {
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
        tableName: ModelPgConstant.POLL_ANSWER_CHOSEN,
      },
    )

    return PollAnswerChosen
  }
}
