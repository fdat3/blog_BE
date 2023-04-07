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
  declare pollIds: CreationOptional<string[]>
  declare type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'POPULARITY'
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
        type: {
          type: DataTypes.ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'POPULARITY'),
          defaultValue: 'POPULARITY',
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
