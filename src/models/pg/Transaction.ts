import ModelPgConstant from '@/constants/model.pg.constant'

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
  Sequelize,
} from 'sequelize'
import type { PollHandlePriority } from './PollHandlePriority'
import type { PollUpPackage } from './PollUpPackage'
import type { User } from './User'

type TransactionAssociations = 'handlePolls' | 'package' | 'user'

export class Transaction extends Model<
  InferAttributes<Transaction, { omit: TransactionAssociations }>,
  InferCreationAttributes<Transaction, { omit: TransactionAssociations }>
> {
  declare id: CreationOptional<string>
  declare packageId: string | null
  declare amount: number | null
  declare userId: string | null
  declare deletedAt: Date | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Transaction hasMany PollHandlePriority (as HandlePoll)
  declare handlePolls?: NonAttribute<PollHandlePriority[]>
  declare getHandlePolls: HasManyGetAssociationsMixin<PollHandlePriority>
  declare setHandlePolls: HasManySetAssociationsMixin<
    PollHandlePriority,
    string
  >
  declare addHandlePoll: HasManyAddAssociationMixin<PollHandlePriority, string>
  declare addHandlePolls: HasManyAddAssociationsMixin<
    PollHandlePriority,
    string
  >
  declare createHandlePoll: HasManyCreateAssociationMixin<PollHandlePriority>
  declare removeHandlePoll: HasManyRemoveAssociationMixin<
    PollHandlePriority,
    string
  >
  declare removeHandlePolls: HasManyRemoveAssociationsMixin<
    PollHandlePriority,
    string
  >
  declare hasHandlePoll: HasManyHasAssociationMixin<PollHandlePriority, string>
  declare hasHandlePolls: HasManyHasAssociationsMixin<
    PollHandlePriority,
    string
  >
  declare countHandlePolls: HasManyCountAssociationsMixin

  // Transaction belongsTo PollUpPackage (as Package)
  declare package?: NonAttribute<PollUpPackage>
  declare getPackage: BelongsToGetAssociationMixin<PollUpPackage>
  declare setPackage: BelongsToSetAssociationMixin<PollUpPackage, string>
  declare createPackage: BelongsToCreateAssociationMixin<PollUpPackage>

  // Transaction belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    handlePolls: Association<Transaction, PollHandlePriority>
    package: Association<Transaction, PollUpPackage>
    user: Association<Transaction, User>
  }

  static initModel(sequelize: Sequelize): typeof Transaction {
    Transaction.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        packageId: {
          type: DataTypes.UUID,
        },
        amount: {
          type: DataTypes.BIGINT,
        },
        userId: {
          type: DataTypes.UUID,
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
        tableName: ModelPgConstant.TRANSACTION,
      },
    )

    return Transaction
  }
}
