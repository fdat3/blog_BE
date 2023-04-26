import ModelPgConstant from '@/constants/model.pg.constant'
import { SearchHistory } from '@/models/pg/SearchHistory'
import UserUtils from '@/utils/user.utils'
import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Block } from './Block'
import type { ContactList } from './ContactList'
import type { Follow } from './Follow'
import type { ReportUser } from './ReportUser'
import { Transaction } from './Transaction'

export class User extends Model {
  declare id: CreationOptional<string>
  declare fullname: CreationOptional<string>
  declare password: CreationOptional<string>
  declare dob: CreationOptional<Date>
  declare username: CreationOptional<string>
  declare email: CreationOptional<string>
  declare phone: CreationOptional<string>
  declare inviteCode: CreationOptional<string>
  declare refCode: CreationOptional<string>
  declare gender: string | null
  declare instagram: string | null
  declare mbti:
    | 'INTJ'
    | 'INTP'
    | 'ENTJ'
    | 'ENTP'
    | 'INFJ'
    | 'INFP'
    | 'ENFJ'
    | 'ENFP'
    | 'ISTJ'
    | 'ISFJ'
    | 'ESTI'
    | 'ESFJ'
    | 'ISTP'
    | 'ISFP'
    | 'ESTP'
    | 'ESFP'
    | null
  declare identify: CreationOptional<string>
  declare isAdmin: CreationOptional<boolean>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  declare countDeviceSession: HasManyCountAssociationsMixin

  // User hasMany Block (as Blockers)
  declare blockers?: NonAttribute<Block[]>
  declare getBlockers: HasManyGetAssociationsMixin<Block>
  declare setBlockers: HasManySetAssociationsMixin<Block, string>
  declare addBlocker: HasManyAddAssociationMixin<Block, string>
  declare addBlockers: HasManyAddAssociationsMixin<Block, string>
  declare createBlocker: HasManyCreateAssociationMixin<Block>
  declare removeBlocker: HasManyRemoveAssociationMixin<Block, string>
  declare removeBlockers: HasManyRemoveAssociationsMixin<Block, string>
  declare hasBlocker: HasManyHasAssociationMixin<Block, string>
  declare hasBlockers: HasManyHasAssociationsMixin<Block, string>
  declare countBlockers: HasManyCountAssociationsMixin

  // User hasMany Block (as Blocked)
  declare blockeds?: NonAttribute<Block[]>
  declare getBlockeds: HasManyGetAssociationsMixin<Block>
  declare setBlockeds: HasManySetAssociationsMixin<Block, string>
  declare addBlocked: HasManyAddAssociationMixin<Block, string>
  declare addBlockeds: HasManyAddAssociationsMixin<Block, string>
  declare createBlocked: HasManyCreateAssociationMixin<Block>
  declare removeBlocked: HasManyRemoveAssociationMixin<Block, string>
  declare removeBlockeds: HasManyRemoveAssociationsMixin<Block, string>
  declare hasBlocked: HasManyHasAssociationMixin<Block, string>
  declare hasBlockeds: HasManyHasAssociationsMixin<Block, string>
  declare countBlockeds: HasManyCountAssociationsMixin

  // User hasMany ReportUser (as Reports)
  declare reports?: NonAttribute<ReportUser[]>
  declare getReports: HasManyGetAssociationsMixin<ReportUser>
  declare setReports: HasManySetAssociationsMixin<ReportUser, string>
  declare addReport: HasManyAddAssociationMixin<ReportUser, string>
  declare addReports: HasManyAddAssociationsMixin<ReportUser, string>
  declare createReport: HasManyCreateAssociationMixin<ReportUser>
  declare removeReport: HasManyRemoveAssociationMixin<ReportUser, string>
  declare removeReports: HasManyRemoveAssociationsMixin<ReportUser, string>
  declare hasReport: HasManyHasAssociationMixin<ReportUser, string>
  declare hasReports: HasManyHasAssociationsMixin<ReportUser, string>
  declare countReports: HasManyCountAssociationsMixin

  // User hasMany ReportUser (as IsReported)
  declare isReporteds?: NonAttribute<ReportUser[]>
  declare getIsReporteds: HasManyGetAssociationsMixin<ReportUser>
  declare setIsReporteds: HasManySetAssociationsMixin<ReportUser, string>
  declare addIsReported: HasManyAddAssociationMixin<ReportUser, string>
  declare addIsReporteds: HasManyAddAssociationsMixin<ReportUser, string>
  declare createIsReported: HasManyCreateAssociationMixin<ReportUser>
  declare removeIsReported: HasManyRemoveAssociationMixin<ReportUser, string>
  declare removeIsReporteds: HasManyRemoveAssociationsMixin<ReportUser, string>
  declare hasIsReported: HasManyHasAssociationMixin<ReportUser, string>
  declare hasIsReporteds: HasManyHasAssociationsMixin<ReportUser, string>
  declare countIsReporteds: HasManyCountAssociationsMixin

  // User hasMany Follow (as Following)
  declare followings?: NonAttribute<Follow[]>
  declare getFollowings: HasManyGetAssociationsMixin<Follow>
  declare setFollowings: HasManySetAssociationsMixin<Follow, string>
  declare addFollowing: HasManyAddAssociationMixin<Follow, string>
  declare addFollowings: HasManyAddAssociationsMixin<Follow, string>
  declare createFollowing: HasManyCreateAssociationMixin<Follow>
  declare removeFollowing: HasManyRemoveAssociationMixin<Follow, string>
  declare removeFollowings: HasManyRemoveAssociationsMixin<Follow, string>
  declare hasFollowing: HasManyHasAssociationMixin<Follow, string>
  declare hasFollowings: HasManyHasAssociationsMixin<Follow, string>
  declare countFollowings: HasManyCountAssociationsMixin

  // User hasMany Follow (as Followed)
  declare followeds?: NonAttribute<Follow[]>
  declare getFolloweds: HasManyGetAssociationsMixin<Follow>
  declare setFolloweds: HasManySetAssociationsMixin<Follow, string>
  declare addFollowed: HasManyAddAssociationMixin<Follow, string>
  declare addFolloweds: HasManyAddAssociationsMixin<Follow, string>
  declare createFollowed: HasManyCreateAssociationMixin<Follow>
  declare removeFollowed: HasManyRemoveAssociationMixin<Follow, string>
  declare removeFolloweds: HasManyRemoveAssociationsMixin<Follow, string>
  declare hasFollowed: HasManyHasAssociationMixin<Follow, string>
  declare hasFolloweds: HasManyHasAssociationsMixin<Follow, string>
  declare countFolloweds: HasManyCountAssociationsMixin

  // User hasMany SearchHistory (as SearchHistory)
  declare searchHistories?: NonAttribute<SearchHistory[]>
  declare getSearchHistories: HasManyGetAssociationsMixin<SearchHistory>
  declare setSearchHistories: HasManySetAssociationsMixin<SearchHistory, string>
  declare addSearchHistory: HasManyAddAssociationMixin<SearchHistory, string>
  declare addSearchHistories: HasManyAddAssociationsMixin<SearchHistory, string>
  declare createSearchHistory: HasManyCreateAssociationMixin<SearchHistory>
  declare removeSearchHistory: HasManyRemoveAssociationMixin<
    SearchHistory,
    string
  >
  declare removeSearchHistories: HasManyRemoveAssociationsMixin<
    SearchHistory,
    string
  >
  declare hasSearchHistory: HasManyHasAssociationMixin<SearchHistory, string>
  declare hasSearchHistories: HasManyHasAssociationsMixin<SearchHistory, string>
  declare countSearchHistories: HasManyCountAssociationsMixin

  // User hasMany ContactList (as Contacts)
  declare contacts?: NonAttribute<ContactList[]>
  declare getContacts: HasManyGetAssociationsMixin<ContactList>
  declare setContacts: HasManySetAssociationsMixin<ContactList, string>
  declare addContact: HasManyAddAssociationMixin<ContactList, string>
  declare addContacts: HasManyAddAssociationsMixin<ContactList, string>
  declare createContact: HasManyCreateAssociationMixin<ContactList>
  declare removeContact: HasManyRemoveAssociationMixin<ContactList, string>
  declare removeContacts: HasManyRemoveAssociationsMixin<ContactList, string>
  declare hasContact: HasManyHasAssociationMixin<ContactList, string>
  declare hasContacts: HasManyHasAssociationsMixin<ContactList, string>
  declare countContacts: HasManyCountAssociationsMixin

  // User hasMany ContactList (as ContactInfo)
  declare contactInfos?: NonAttribute<ContactList[]>
  declare getContactInfos: HasManyGetAssociationsMixin<ContactList>
  declare setContactInfos: HasManySetAssociationsMixin<ContactList, string>
  declare addContactInfo: HasManyAddAssociationMixin<ContactList, string>
  declare addContactInfos: HasManyAddAssociationsMixin<ContactList, string>
  declare createContactInfo: HasManyCreateAssociationMixin<ContactList>
  declare removeContactInfo: HasManyRemoveAssociationMixin<ContactList, string>
  declare removeContactInfos: HasManyRemoveAssociationsMixin<
    ContactList,
    string
  >
  declare hasContactInfo: HasManyHasAssociationMixin<ContactList, string>
  declare hasContactInfos: HasManyHasAssociationsMixin<ContactList, string>
  declare countContactInfos: HasManyCountAssociationsMixin

  // User hasMany Transaction (as Transactions)
  declare transactions?: NonAttribute<Transaction[]>
  declare getTransactions: HasManyGetAssociationsMixin<Transaction>
  declare setTransactions: HasManySetAssociationsMixin<Transaction, string>
  declare addTransaction: HasManyAddAssociationMixin<Transaction, string>
  declare addTransactions: HasManyAddAssociationsMixin<Transaction, string>
  declare createTransaction: HasManyCreateAssociationMixin<Transaction>
  declare removeTransaction: HasManyRemoveAssociationMixin<Transaction, string>
  declare removeTransactions: HasManyRemoveAssociationsMixin<
    Transaction,
    string
  >
  declare hasTransaction: HasManyHasAssociationMixin<Transaction, string>
  declare hasTransactions: HasManyHasAssociationsMixin<Transaction, string>
  declare countTransactions: HasManyCountAssociationsMixin

  declare static associations: {
    blockers: Association<User, Block>
    blockeds: Association<User, Block>
    reports: Association<User, ReportUser>
    isReporteds: Association<User, ReportUser>
    followings: Association<User, Follow>
    followeds: Association<User, Follow>
    searchHistories: Association<User, SearchHistory>
    contacts: Association<User, ContactList>
    contactInfos: Association<User, ContactList>
    transactions: Association<User, Transaction>
  }

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        fullname: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        dob: {
          type: DataTypes.DATE,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING(15),
          unique: false,
        },
        avatar: {
          type: DataTypes.STRING(),
        },
        gender: {
          type: DataTypes.STRING(10),
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
        tableName: ModelPgConstant.USER,
        hooks: {
          beforeCreate: (instance: any): void => {
            if (!instance.inviteCode) {
              instance.inviteCode = UserUtils.generateInviteCode()
            }
            if (!instance.username) {
              instance.username = UserUtils.generateUserName()
            }
          },
        },
        defaultScope: {
          attributes: {
            exclude: ['password'],
          },
        },
        scopes: {
          withPassword: {},
          basicScope: {
            attributes: ['id', 'fullname', 'avatar'],
          },
        },
      },
    )

    return User
  }
}
