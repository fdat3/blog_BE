import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

export class Mbti extends Model<
  InferAttributes<Mbti>,
  InferCreationAttributes<Mbti>
> {
  declare id: CreationOptional<uuid>
  declare label: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  declare user: NonAttribute<User>
  declare getUsers: HasManyGetAssociationsMixin<User>
  declare setUsers: CreationOptional<HasManySetAssociationsMixin<User, string>>
  declare setUser: HasOneSetAssociationMixin<User, uuid>

  static initModel(sequelize: Sequelize): typeof Mbti {
    Mbti.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        label: {
          type: DataTypes.STRING(20),
          unique: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at',
        },
        deletedAt: {
          type: DataTypes.DATE,
          field: 'deleted_at',
        },
      },
      {
        sequelize,
        tableName: ModelPgConstant.MBTI,
      },
    )

    return Mbti
  }
}
