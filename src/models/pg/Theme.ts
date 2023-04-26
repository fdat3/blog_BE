import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Setting } from './Setting'

type ThemeAssociations = 'themeId'

export class Theme extends Model<
  InferAttributes<Theme, { omit: ThemeAssociations }>,
  InferCreationAttributes<Theme, { omit: ThemeAssociations }>
> {
  declare id: CreationOptional<number>
  declare title: string | null
  declare setting: JSON | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Theme belongsTo Setting (as ThemeId)
  declare themeId?: NonAttribute<Setting>
  declare getThemeId: BelongsToGetAssociationMixin<Setting>
  declare setThemeId: BelongsToSetAssociationMixin<Setting, number>
  declare createThemeId: BelongsToCreateAssociationMixin<Setting>

  declare static associations: {
    themeId: Association<Theme, Setting>
  }

  static initModel(sequelize: Sequelize): typeof Theme {
    Theme.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
        },
        setting: {
          type: DataTypes.JSONB,
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

    return Theme
  }
}
