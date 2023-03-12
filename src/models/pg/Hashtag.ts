import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize'
import ModelPgConstant from '@/constants/model.pg.constant'

export class Hashtag extends Model<
  InferAttributes<Hashtag>,
  InferCreationAttributes<Hashtag>
> {
  declare id: CreationOptional<uuid>
  declare name: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof Hashtag {
    Hashtag.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING(200),
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
        tableName: ModelPgConstant.HASHTAG,
      },
    )

    return Hashtag
  }
}
