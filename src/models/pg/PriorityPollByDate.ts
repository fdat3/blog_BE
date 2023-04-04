import ModelPgConstant from '@/constants/model.pg.constant'

import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize'

export class PriorityPollByDate extends Model<
  InferAttributes<PriorityPollByDate>,
  InferCreationAttributes<PriorityPollByDate>
> {
  declare id: CreationOptional<string>
  declare pollIds: string[] | null
  declare deletedAt: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof PriorityPollByDate {
    PriorityPollByDate.init(
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
        tableName: ModelPgConstant.PRIORITY_POLL_BY_DATE,
      },
    )

    return PriorityPollByDate
  }
}
