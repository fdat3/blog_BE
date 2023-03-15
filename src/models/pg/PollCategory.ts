import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Poll } from './Poll'

type PollCategoryAssociations = 'polls'

export class PollCategory extends Model<
  InferAttributes<PollCategory, { omit: PollCategoryAssociations }>,
  InferCreationAttributes<PollCategory, { omit: PollCategoryAssociations }>
> {
  declare id: CreationOptional<string>
  declare label: string | null
  declare hashtag: string[] | null
  declare description: string | null
  declare image: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // PollCategory hasMany Poll (as Polls)
  declare polls?: NonAttribute<Poll[]>
  declare getPolls: HasManyGetAssociationsMixin<Poll>
  declare setPolls: HasManySetAssociationsMixin<Poll, string>
  declare addPoll: HasManyAddAssociationMixin<Poll, string>
  declare addPolls: HasManyAddAssociationsMixin<Poll, string>
  declare createPoll: HasManyCreateAssociationMixin<Poll>
  declare removePoll: HasManyRemoveAssociationMixin<Poll, string>
  declare removePolls: HasManyRemoveAssociationsMixin<Poll, string>
  declare hasPoll: HasManyHasAssociationMixin<Poll, string>
  declare hasPolls: HasManyHasAssociationsMixin<Poll, string>
  declare countPolls: HasManyCountAssociationsMixin

  declare static associations: {
    polls: Association<PollCategory, Poll>
  }

  static initModel(sequelize: Sequelize): typeof PollCategory {
    PollCategory.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        label: {
          type: DataTypes.STRING(100),
          unique: true,
        },
        hashtag: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
        description: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING(255),
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

    return PollCategory
  }
}
