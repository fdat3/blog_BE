import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize'
import ModelPgConstant from '@/constants/model.pg.constant'

export class GlobalPoint extends Model<
  InferAttributes<GlobalPoint>,
  InferCreationAttributes<GlobalPoint>
> {
  declare id: CreationOptional<string>
  declare type: 'DAILY_ATTENDANCE' | null
  declare point: number | null
  declare deletedAt: Date | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof GlobalPoint {
    GlobalPoint.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        type: {
          type: DataTypes.ENUM('DAILY_ATTENDANCE'),
        },
        point: {
          type: DataTypes.INTEGER,
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
        tableName: ModelPgConstant.GLOBAL_POINT,
      },
    )

    return GlobalPoint
  }
}
