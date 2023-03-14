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
import type { Hashtag } from './Hashtag'
import type { Poll } from './Poll'

type PollHashtagAssociations = 'poll' | 'hashtag'

export class PollHashtag extends Model<
  InferAttributes<PollHashtag, { omit: PollHashtagAssociations }>,
  InferCreationAttributes<PollHashtag, { omit: PollHashtagAssociations }>
> {
  declare id: CreationOptional<string>
  declare pollId: string | null
  declare hashtagId: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // PollHashtag belongsTo Poll (as Poll)
  declare poll?: NonAttribute<Poll>
  declare getPoll: BelongsToGetAssociationMixin<Poll>
  declare setPoll: BelongsToSetAssociationMixin<Poll, string>
  declare createPoll: BelongsToCreateAssociationMixin<Poll>

  // PollHashtag belongsTo Hashtag (as Hashtag)
  declare hashtag?: NonAttribute<Hashtag>
  declare getHashtag: BelongsToGetAssociationMixin<Hashtag>
  declare setHashtag: BelongsToSetAssociationMixin<Hashtag, string>
  declare createHashtag: BelongsToCreateAssociationMixin<Hashtag>

  declare static associations: {
    poll: Association<PollHashtag, Poll>
    hashtag: Association<PollHashtag, Hashtag>
  }

  static initModel(sequelize: Sequelize): typeof PollHashtag {
    PollHashtag.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        pollId: {
          type: DataTypes.UUID,
        },
        hashtagId: {
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
      },
    )

    return PollHashtag
  }
}
