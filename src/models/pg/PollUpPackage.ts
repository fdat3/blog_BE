import ModelPgConstant from '@/constants/model.pg.constant'

import {
  Association,
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
import type { Transaction } from './Transaction'
import type { PollUpPackageUserBought } from './PollUpPackageUserBought'

type PollUpPackageAssociations = 'transactions' | 'packageSolds'

export class PollUpPackage extends Model<
  InferAttributes<PollUpPackage, { omit: PollUpPackageAssociations }>,
  InferCreationAttributes<PollUpPackage, { omit: PollUpPackageAssociations }>
> {
  declare id: CreationOptional<string>
  declare amount: number | null
  declare name: CreationOptional<string>
  declare description: CreationOptional<string>
  // declare type: 'PG' | 'APPLE_PAY' | 'GOOGLE_PAY' | null
  declare deletedAt: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // PollUpPackage hasMany Transaction (as Transactions)
  declare transactions?: NonAttribute<Transaction[]>
  declare getTransactions: HasManyGetAssociationsMixin<Transaction>
  declare setTransactions: HasManySetAssociationsMixin<Transaction, string>
  declare addTransaction: HasManyAddAssociationMixin<Transaction, string>
  declare addTransactions: HasManyAddAssociationsMixin<Transaction, string>
  declare createTransaction: HasManyCreateAssociationMixin<Transaction>
  declare removeTransaction: HasManyRemoveAssociationMixin<Transaction, string>
  declare removeTransactions: HasManyRemoveAssociationsMixin<
    Transaction,
    string
  >
  declare hasTransaction: HasManyHasAssociationMixin<Transaction, string>
  declare hasTransactions: HasManyHasAssociationsMixin<Transaction, string>
  declare countTransactions: HasManyCountAssociationsMixin

  // PollUpPackage hasMany PollUpPackageUserBought (as PackageSold)
  declare packageSolds?: NonAttribute<PollUpPackageUserBought[]>
  declare getPackageSolds: HasManyGetAssociationsMixin<PollUpPackageUserBought>
  declare setPackageSolds: HasManySetAssociationsMixin<
    PollUpPackageUserBought,
    string
  >
  declare addPackageSold: HasManyAddAssociationMixin<
    PollUpPackageUserBought,
    string
  >
  declare addPackageSolds: HasManyAddAssociationsMixin<
    PollUpPackageUserBought,
    string
  >
  declare createPackageSold: HasManyCreateAssociationMixin<PollUpPackageUserBought>
  declare removePackageSold: HasManyRemoveAssociationMixin<
    PollUpPackageUserBought,
    string
  >
  declare removePackageSolds: HasManyRemoveAssociationsMixin<
    PollUpPackageUserBought,
    string
  >
  declare hasPackageSold: HasManyHasAssociationMixin<
    PollUpPackageUserBought,
    string
  >
  declare hasPackageSolds: HasManyHasAssociationsMixin<
    PollUpPackageUserBought,
    string
  >
  declare countPackageSolds: HasManyCountAssociationsMixin

  declare static associations: {
    transactions: Association<PollUpPackage, Transaction>
    packageSolds: Association<PollUpPackage, PollUpPackageUserBought>
  }

  static initModel(sequelize: Sequelize): typeof PollUpPackage {
    PollUpPackage.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        amount: {
          type: DataTypes.BIGINT,
        },
        // type: {
        //   type: DataTypes.ENUM('PG', 'APPLE_PAY', 'GOOGLE_PAY'),
        // },
        name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        deletedAt: {
          type: DataTypes.STRING,
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
        tableName: ModelPgConstant.POLL_UP_PACKAGE,
      },
    )

    return PollUpPackage
  }
}
