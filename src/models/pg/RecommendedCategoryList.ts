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
import type { PollCategory } from './PollCategory'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type RecommendedCategoryListAssociations = 'category' | 'user'

export class RecommendedCategoryList extends Model<
  InferAttributes<
    RecommendedCategoryList,
    { omit: RecommendedCategoryListAssociations }
  >,
  InferCreationAttributes<
    RecommendedCategoryList,
    { omit: RecommendedCategoryListAssociations }
  >
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare pollCategoryId: string | null
  declare clickCount: number | null
  declare deletedAt: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // RecommendedCategoryList belongsTo PollCategory (as Category)
  declare category?: NonAttribute<PollCategory>
  declare getCategory: BelongsToGetAssociationMixin<PollCategory>
  declare setCategory: BelongsToSetAssociationMixin<PollCategory, string>
  declare createCategory: BelongsToCreateAssociationMixin<PollCategory>

  // RecommendedCategoryList belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    category: Association<RecommendedCategoryList, PollCategory>
    user: Association<RecommendedCategoryList, User>
  }

  static initModel(sequelize: Sequelize): typeof RecommendedCategoryList {
    RecommendedCategoryList.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        pollCategoryId: {
          type: DataTypes.UUID,
        },
        clickCount: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
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
        modelName: ModelPgConstant.RECOMMEND_CATEGORY_LIST,
      },
    )

    return RecommendedCategoryList
  }
}
