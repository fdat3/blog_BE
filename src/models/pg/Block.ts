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

type BlockAssociations = 'user' | 'blocked'

export class Block extends Model<
  InferAttributes<Block, { omit: BlockAssociations }>,
  InferCreationAttributes<Block, { omit: BlockAssociations }>
> {
  declare id: CreationOptional<string>
  declare blockerId: string | null
  declare blockedId: string | null
  declare reason: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // Block belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // Block belongsTo User (as Blocked)
  declare blocked?: NonAttribute<User>
  declare getBlocked: BelongsToGetAssociationMixin<User>
  declare setBlocked: BelongsToSetAssociationMixin<User, string>
  declare createBlocked: BelongsToCreateAssociationMixin<User>

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
          defaultValue: DataTypes.UUIDV1,
        },
        blockedId: {
          type: DataTypes.UUID,
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
      },
    )

    return Block
  }
}
