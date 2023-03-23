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
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type FollowAssociations = 'user' | 'followed'

export class Follow extends Model<
  InferAttributes<Follow, { omit: FollowAssociations }>,
  InferCreationAttributes<Follow, { omit: FollowAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare followedId: string | null
  declare clickCount: CreationOptional<number>
  declare deletedAt: CreationOptional<Date>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Follow belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // Follow belongsTo User (as Followed)
  declare followed?: NonAttribute<User>
  declare getFollowed: BelongsToGetAssociationMixin<User>
  declare setFollowed: BelongsToSetAssociationMixin<User, string>
  declare createFollowed: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<Follow, User>
    followed: Association<Follow, User>
  }

  static initModel(sequelize: Sequelize): typeof Follow {
    Follow.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        followedId: {
          type: DataTypes.UUID,
        },
        clickCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        deletedAt: {
          type: DataTypes.DATE,
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
        tableName: ModelPgConstant.FOLLOW,
        defaultScope: {
          order: [
            ['updatedAt', 'desc'],
            ['clickCount', 'desc'],
          ],
        },
      },
    )

    return Follow
  }
}
