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

type SessionAssociations = 'user'

export class Session extends Model<
  InferAttributes<Session, { omit: SessionAssociations }>,
  InferCreationAttributes<Session, { omit: SessionAssociations }>
> {
  declare userId: string | null
  declare sid: CreationOptional<string>
  declare expires: string | null
  declare data: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Session belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<Session, User>
  }

  static initModel(sequelize: Sequelize): typeof Session {
    Session.init(
      {
        userId: {
          type: DataTypes.UUID,
        },
        sid: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        expires: {
          type: DataTypes.STRING,
        },
        data: {
          type: DataTypes.TEXT,
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

    return Session
  }
}
