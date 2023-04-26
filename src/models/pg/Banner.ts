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

type BannerAssociations = 'bannerId'

export class Banner extends Model<
  InferAttributes<Banner, { omit: BannerAssociations }>,
  InferCreationAttributes<Banner, { omit: BannerAssociations }>
> {
  declare id: CreationOptional<number>
  declare type: 'MAIN  ORDER' | null
  declare imageList: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Banner belongsTo Setting (as BannerId)
  declare bannerId?: NonAttribute<Setting>
  declare getBannerId: BelongsToGetAssociationMixin<Setting>
  declare setBannerId: BelongsToSetAssociationMixin<Setting, number>
  declare createBannerId: BelongsToCreateAssociationMixin<Setting>

  declare static associations: {
    bannerId: Association<Banner, Setting>
  }

  static initModel(sequelize: Sequelize): typeof Banner {
    Banner.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('MAIN  ORDER'),
        },
        imageList: {
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
      },
    )

    return Banner
  }
}
