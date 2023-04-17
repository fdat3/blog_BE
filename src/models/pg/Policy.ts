import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize'

export class Policy extends Model<
  InferAttributes<Policy>,
  InferCreationAttributes<Policy>
> {
  declare id: CreationOptional<string>
  declare type: 'NAME' | 'CONTENT' | null
  declare deletedAt: string | null
  declare isActive: boolean | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof Policy {
    Policy.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        type: {
          type: DataTypes.ENUM('NAME', 'CONTENT'),
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
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
      },
    )

    return Policy
  }
}
