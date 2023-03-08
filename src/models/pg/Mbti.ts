import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'
import ModelPgConstant from '@/constants/model.pg.constant'

export class Mbti extends Model<
  InferAttributes<Mbti>,
  InferCreationAttributes<Mbti>
> {
  declare id: CreationOptional<uuid>
  declare label: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  static initModel(sequelize: Sequelize): typeof Mbti {
    Mbti.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      label: {
        type: DataTypes.STRING(20),
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      },
    }, {
      sequelize,
      tableName: ModelPgConstant.MBTI
    })
    
    return Mbti
  }
}