import {
  Association,
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Banner } from './Banner'
import type { Theme } from './Theme'

type SettingAssociations = 'banner' | 'theme'

export class Setting extends Model<
  InferAttributes<Setting, { omit: SettingAssociations }>,
  InferCreationAttributes<Setting, { omit: SettingAssociations }>
> {
  declare id: CreationOptional<number>
  declare type: string | null
  declare bannerId: string | null
  declare themeId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Setting hasOne Banner
  declare banner?: NonAttribute<Banner>
  declare getBanner: HasOneGetAssociationMixin<Banner>
  declare setBanner: HasOneSetAssociationMixin<Banner, number>
  declare createBanner: HasOneCreateAssociationMixin<Banner>

  // Setting hasOne Theme
  declare theme?: NonAttribute<Theme>
  declare getTheme: HasOneGetAssociationMixin<Theme>
  declare setTheme: HasOneSetAssociationMixin<Theme, number>
  declare createTheme: HasOneCreateAssociationMixin<Theme>

  declare static associations: {
    banner: Association<Setting, Banner>
    theme: Association<Setting, Theme>
  }

  static initModel(sequelize: Sequelize): typeof Setting {
    Setting.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
        },
        bannerId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        themeId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
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

    return Setting
  }
}
