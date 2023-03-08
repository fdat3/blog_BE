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
  Sequelize
} from 'sequelize'
import type { Poll } from './Poll'
import type { PollAnswerChosen } from './PollAnswerChosen'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollAnswerAssociations = 'poll' | 'user' | 'chosens'

export class PollAnswer extends Model<
  InferAttributes<PollAnswer, {omit: PollAnswerAssociations}>,
  InferCreationAttributes<PollAnswer, {omit: PollAnswerAssociations}>
> {
  declare id: CreationOptional<uuid>
  declare pollId: string | null
  declare userId: string | null
  declare content: string | null
  declare image: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // PollAnswer belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>
  
  // PollAnswer belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>
  
  // PollAnswer hasMany PollAnswerChosen (as Chosen)
  declare chosens?: NonAttribute<PollAnswerChosen[]>
  declare getChosens: HasManyGetAssociationsMixin<PollAnswerChosen>
  declare setChosens: HasManySetAssociationsMixin<PollAnswerChosen, number>
  declare addChosen: HasManyAddAssociationMixin<PollAnswerChosen, number>
  declare addChosens: HasManyAddAssociationsMixin<PollAnswerChosen, number>
  declare createChosen: HasManyCreateAssociationMixin<PollAnswerChosen>
  declare removeChosen: HasManyRemoveAssociationMixin<PollAnswerChosen, number>
  declare removeChosens: HasManyRemoveAssociationsMixin<PollAnswerChosen, number>
  declare hasChosen: HasManyHasAssociationMixin<PollAnswerChosen, number>
  declare hasChosens: HasManyHasAssociationsMixin<PollAnswerChosen, number>
  declare countChosens: HasManyCountAssociationsMixin
  
  declare static associations: {
    poll: Association<PollAnswer, Poll>,
    user: Association<PollAnswer, User>,
    chosens: Association<PollAnswer, PollAnswerChosen>
  }

  static initModel(sequelize: Sequelize): typeof PollAnswer {
    PollAnswer.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      pollId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      content: {
        type: DataTypes.TEXT
      },
      image: {
        type: DataTypes.STRING(255)
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: ModelPgConstant.POLL_ANSWER
    })
    
    return PollAnswer
  }
}