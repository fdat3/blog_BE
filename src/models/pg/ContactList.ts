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

type ContactListAssociations = 'user' | 'contactInfo'

export class ContactList extends Model<
  InferAttributes<ContactList, { omit: ContactListAssociations }>,
  InferCreationAttributes<ContactList, { omit: ContactListAssociations }>
> {
  declare id: CreationOptional<string>
  declare userId: string | null
  declare contactId: string | null
  declare phone: string | null
  declare name: string | null
  declare isSync: boolean | null
  declare deletedAt: Date | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // ContactList belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, string>
  declare createUser: BelongsToCreateAssociationMixin<User>

  // ContactList belongsTo User (as ContactInfo)
  declare contactInfo?: NonAttribute<User>
  declare getContactInfo: BelongsToGetAssociationMixin<User>
  declare setContactInfo: BelongsToSetAssociationMixin<User, string>
  declare createContactInfo: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    user: Association<ContactList, User>
    contactInfo: Association<ContactList, User>
  }

  static initModel(sequelize: Sequelize): typeof ContactList {
    ContactList.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.UUID,
        },
        contactId: {
          type: DataTypes.UUID,
        },
        phone: {
          type: DataTypes.STRING(20),
        },
        name: {
          type: DataTypes.STRING,
        },
        isSync: {
          type: DataTypes.BOOLEAN,
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
        tableName: ModelPgConstant.CONTACT_LIST,
      },
    )

    return ContactList
  }
}
