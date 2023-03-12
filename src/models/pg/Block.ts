import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
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
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type BlockAssociations = 'user' | 'blocked'

export class Block extends Model<
  InferAttributes<Block, { omit: BlockAssociations }>,
  InferCreationAttributes<Block, { omit: BlockAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare blockerId: uuid | null
  declare blockedId: uuid | null
  declare reason?: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // Block belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // Block hasOne User (as Blocked)
  declare blocked?: NonAttribute<User>
  declare getBlocked: HasOneGetAssociationMixin<User>
  declare setBlocked: HasOneSetAssociationMixin<User, string>
  declare createBlocked: HasOneCreateAssociationMixin<User>

  declare static associations: {
    user: Association<Block, User>
    blocked: Association<Block, User>
  }

  static initModel(sequelize: Sequelize): typeof Block {
    Block.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        blockerId: {
          type: DataTypes.UUID,
        },
        blockedId: {
          type: DataTypes.UUID,
          field: 'blocked_id',
        },
        reason: {
          type: DataTypes.TEXT,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: ModelPgConstant.BLOCK,
      },
    )

    return Block
  }
}
