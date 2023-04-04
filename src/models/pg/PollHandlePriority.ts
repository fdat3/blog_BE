import ModelPgConstant from '@/constants/model.pg.constant'
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
import type { Transaction } from './Transaction'

type PollHandlePriorityAssociations = 'poll' | 'transaction'

export class PollHandlePriority extends Model<
  InferAttributes<PollHandlePriority, { omit: PollHandlePriorityAssociations }>,
  InferCreationAttributes<
    PollHandlePriority,
    { omit: PollHandlePriorityAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare pollId: string | null
  declare startDate: string | null
  declare endDate: string | null
  declare isViewUpdatedByAdmin: boolean | null
  declare adminUpdateView: number | null
  declare transactionId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // PollHandlePriority belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>

  // PollHandlePriority belongsTo Transaction (as Transaction)
  declare transaction?: NonAttribute<Transaction>
  declare getTransaction: BelongsToGetAssociationMixin<Transaction>
  declare setTransaction: BelongsToSetAssociationMixin<Transaction, string>
  declare createTransaction: BelongsToCreateAssociationMixin<Transaction>

  declare static associations: {
    poll: Association<PollHandlePriority, Poll>
    transaction: Association<PollHandlePriority, Transaction>
  }

  static initModel(sequelize: Sequelize): typeof PollHandlePriority {
    PollHandlePriority.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        pollId: {
          type: DataTypes.UUID,
        },
        startDate: {
          type: DataTypes.DATEONLY,
        },
        endDate: {
          type: DataTypes.DATEONLY,
        },
        isViewUpdatedByAdmin: {
          type: DataTypes.BOOLEAN,
        },
        adminUpdateView: {
          type: DataTypes.BIGINT,
        },
        transactionId: {
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
        tableName: ModelPgConstant.POLL_HANDLE_PRIORITY,
      },
    )

    return PollHandlePriority
  }
}
