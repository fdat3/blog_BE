import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize'
import ModelPgConstant from '@/constants/model.pg.constant'

export class PollCategory extends Model<
  InferAttributes<PollCategory>,
  InferCreationAttributes<PollCategory>
> {
  declare id: CreationOptional<string>
  declare label: string | null
  declare hashtag: string[] | null
  declare description: string | null
  declare image: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof PollCategory {
    PollCategory.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        label: {
          type: DataTypes.STRING(100),
          unique: true,
        },
        hashtag: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
        description: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING(255),
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
        tableName: ModelPgConstant.POLL_CATEGORY_MODEL,
      },
    )

    return PollCategory
  }
}
