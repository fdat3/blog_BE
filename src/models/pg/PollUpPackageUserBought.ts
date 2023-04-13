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
import type { PollUpPackage } from './PollUpPackage'
import type { User } from './User'

type PollUpPackageUserBoughtAssociations = 'user' | 'poll' | 'package'

export class PollUpPackageUserBought extends Model<
  InferAttributes<
    PollUpPackageUserBought,
    { omit: PollUpPackageUserBoughtAssociations }
  >,
  InferCreationAttributes<
    PollUpPackageUserBought,
    { omit: PollUpPackageUserBoughtAssociations }
  >
> {
  declare id: CreationOptional<uuid>
  declare userId: CreationOptional<uuid>
  declare packageId: CreationOptional<uuid>
  declare point: number | null
  declare deletedAt: Date | null
  declare isUsed: boolean | null
  declare usedAt: Date | null
  declare pollId: CreationOptional<uuid>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // PollUpPackageUserBought belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // PollUpPackageUserBought belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>

  // PollUpPackageUserBought belongsTo PollUpPackage (as Package)
  declare package?: NonAttribute<PollUpPackage>
  declare getPackage: BelongsToGetAssociationMixin<PollUpPackage>
  declare setPackage: BelongsToSetAssociationMixin<PollUpPackage, string>
  declare createPackage: BelongsToCreateAssociationMixin<PollUpPackage>

  declare static associations: {
    user: Association<PollUpPackageUserBought, User>
    poll: Association<PollUpPackageUserBought, Poll>
    package: Association<PollUpPackageUserBought, PollUpPackage>
  }

  static initModel(sequelize: Sequelize): typeof PollUpPackageUserBought {
    PollUpPackageUserBought.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
        },
        packageId: {
          type: DataTypes.UUID,
        },
        point: {
          type: DataTypes.INTEGER,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
        isUsed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        usedAt: {
          type: DataTypes.DATE,
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
        tableName: ModelPgConstant.POLL_UP_PACKAGE_USER_BOUGHT,
      },
    )

    return PollUpPackageUserBought
  }
}
