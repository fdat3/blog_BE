import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize,
} from 'sequelize'

export type PolicyType =
  | 'PAYMENT'
  | 'TERMS_OF_USE'
  | 'PRIVACY_POLICY'
  | 'TERMS_OF_PERSONAL_INFORMATION_COLLECTION'

export class Policy extends Model<
  InferAttributes<Policy>,
  InferCreationAttributes<Policy>
> {
  declare id: CreationOptional<uuid>
  declare name: string | null
  declare content: string
  declare type: PolicyType
  declare deletedAt: CreationOptional<Date>
  declare isActive: CreationOptional<boolean>
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
        name: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM(
            'PAYMENT',
            'TERMS_OF_USE',
            'PRIVACY_POLICY',
            'TERMS_OF_PERSONAL_INFORMATION_COLLECTION',
          ),
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
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
