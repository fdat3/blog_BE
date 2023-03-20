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
import type { Poll } from './Poll'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollEntityAssociations = 'poll'

export class PollEntity extends Model<
  InferAttributes<PollEntity, { omit: PollEntityAssociations }>,
  InferCreationAttributes<PollEntity, { omit: PollEntityAssociations }>
> {
  declare id: CreationOptional<string>
  declare offset: number | null
  declare length: number | null
  declare type: 'MENTION' | 'HASHTAG' | null
  declare deletedAt: Date | null
  declare pollId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // PollEntity belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>

  declare static associations: {
    poll: Association<PollEntity, Poll>
  }

  static initModel(sequelize: Sequelize): typeof PollEntity {
    PollEntity.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        offset: {
          type: DataTypes.INTEGER,
        },
        length: {
          type: DataTypes.INTEGER,
        },
        type: {
          type: DataTypes.ENUM('MENTION', 'HASHTAG'),
        },
        deletedAt: {
          type: DataTypes.DATE,
        },
        pollId: {
          type: DataTypes.UUID,
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
        tableName: ModelPgConstant.POLL_ENTITY,
        defaultScope: {
          attributes: {
            exclude: ['id', 'pollId', 'createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      },
    )

    return PollEntity
  }
}
