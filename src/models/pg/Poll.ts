import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
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
import type { PollCategory } from './PollCategory'
import type { PollComment } from './PollComment'
import type { ReportPoll } from './ReportPoll'
import type { User } from './User'
import ModelPgConstant from '@/constants/model.pg.constant'

type PollAssociations = 'category' | 'report' | 'comments'

export class Poll extends Model<
  InferAttributes<Poll, { omit: PollAssociations }>,
  InferCreationAttributes<Poll, { omit: PollAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare categoryId: string | null
  declare title: string | null
  declare description: string | null
  declare image: string | null
  declare hashtag: string[] | null
  declare canAddNewAnswer: boolean | null
  declare anonymousPoll: boolean | null
  declare viewCount: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // Poll belongsTo User (as Polls)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, uuid>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // Poll belongsTo PollCategory (as Category)
  declare category?: NonAttribute<PollCategory>
  declare getCategory: BelongsToGetAssociationMixin<PollCategory>
  declare setCategory: BelongsToSetAssociationMixin<PollCategory, string>
  declare createCategory: BelongsToCreateAssociationMixin<PollCategory>

  // Poll belongsTo ReportPoll (as Reports)
  declare report?: NonAttribute<ReportPoll>
  declare getReport: BelongsToGetAssociationMixin<ReportPoll>
  declare setReport: BelongsToSetAssociationMixin<ReportPoll, number>
  declare createReport: BelongsToCreateAssociationMixin<ReportPoll>

  // Poll hasMany PollComment (as Comments)
  declare comments?: NonAttribute<PollComment[]>
  declare getComments: HasManyGetAssociationsMixin<PollComment>
  declare setComments: HasManySetAssociationsMixin<PollComment, string>
  declare addComment: HasManyAddAssociationMixin<PollComment, string>
  declare addComments: HasManyAddAssociationsMixin<PollComment, string>
  declare createComment: HasManyCreateAssociationMixin<PollComment>
  declare removeComment: HasManyRemoveAssociationMixin<PollComment, string>
  declare removeComments: HasManyRemoveAssociationsMixin<PollComment, string>
  declare hasComment: HasManyHasAssociationMixin<PollComment, string>
  declare hasComments: HasManyHasAssociationsMixin<PollComment, string>
  declare countComments: HasManyCountAssociationsMixin

  declare static associations: {
    user: Association<Poll, User>
    category: Association<Poll, PollCategory>
    report: Association<Poll, ReportPoll>
    comments: Association<Poll, PollComment>
  }

  static initModel(sequelize: Sequelize): typeof Poll {
    Poll.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        categoryId: {
          type: DataTypes.UUID,
        },
        title: {
          type: DataTypes.STRING(100),
        },
        description: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING(200),
        },
        hashtag: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
        canAddNewAnswer: {
          type: DataTypes.BOOLEAN,
        },
        anonymousPoll: {
          type: DataTypes.BOOLEAN,
        },
        viewCount: {
          type: DataTypes.BIGINT,
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
        tableName: ModelPgConstant.POLL,
        defaultScope: {
          attributes: {
            exclude: ['poll_id'],
          },
        },
      },
    )

    return Poll
  }
}
