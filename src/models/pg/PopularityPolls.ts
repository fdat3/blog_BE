import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize'
import ModelPgConstant from '@/constants/model.pg.constant'

export class PopularityPoll extends Model<
  InferAttributes<PopularityPoll>,
  InferCreationAttributes<PopularityPoll>
> {
  declare id: CreationOptional<string>
  declare pollIds: string[] | null
  declare deletedAt: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof PopularityPoll {
    PopularityPoll.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        pollIds: {
          type: DataTypes.ARRAY(DataTypes.STRING),
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
        tableName: ModelPgConstant.POPULARITY_POLL,
      },
    )

    return PopularityPoll
  }
}
