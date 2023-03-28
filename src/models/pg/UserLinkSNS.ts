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

type UserLinkSnAssociations = 'user'

export class UserLinkSNS extends Model<
  InferAttributes<UserLinkSNS, { omit: UserLinkSnAssociations }>,
  InferCreationAttributes<UserLinkSNS, { omit: UserLinkSnAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare loginType:
    | 'FACEBOOK'
    | 'GOOGLE'
    | 'KAKAO'
    | 'NAVER'
    | 'APPLE'
    | 'NORMAL'
    | null
  declare deletedAt: Date | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // UserLinkSn belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<UserLinkSNS, User>
  }

  static initModel(sequelize: Sequelize): typeof UserLinkSNS {
    UserLinkSNS.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        loginType: {
          type: DataTypes.ENUM(
            'FACEBOOK',
            'GOOGLE',
            'KAKAO',
            'NAVER',
            'APPLE',
            'NORMAL',
          ),
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
        tableName: ModelPgConstant.USER_LINK_SNS,
      },
    )

    return UserLinkSNS
  }
}
