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
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type SearchHistoryAssociations = 'user'

export class SearchHistory extends Model<
  InferAttributes<SearchHistory, { omit: SearchHistoryAssociations }>,
  InferCreationAttributes<SearchHistory, { omit: SearchHistoryAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare value: string | null
  declare count: number | null
  declare deletedAt: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // SearchHistory belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<SearchHistory, User>
  }

  static initModel(sequelize: Sequelize): typeof SearchHistory {
    SearchHistory.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        value: {
          type: DataTypes.STRING,
        },
        count: {
          type: DataTypes.INTEGER,
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
        tableName: ModelPgConstant.SEARCH_HISTORY,
      },
    )

    return SearchHistory
  }
}
