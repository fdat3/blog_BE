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
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Block } from './Block'
import type { ContactList } from './ContactList'
import type { Group } from './Group'
import type { GroupMember } from './GroupMember'
import type { Poll } from './Poll'
import type { PollAnswer } from './PollAnswer'
import type { PollAnswerChosen } from './PollAnswerChosen'
import type { PollComment } from './PollComment'
import type { ReportUser } from './ReportUser'
import type { UserDeviceSession } from './UserDevice'
import type { UserSetting } from './UserSetting'
import type { Follow } from './Follow'
import type { UserPoint } from './UserPoint'
import UserUtils from '@/utils/user.utils'
import ModelPgConstant from '@/constants/model.pg.constant'
import { RecommendedCategoryList } from '@/models/pg/RecommendedCategoryList'
import { SearchHistory } from '@/models/pg/SearchHistory'
import { UserLinkSNS } from './UserLinkSNS'

type UserAssociations =
  | 'deviceSession'
  | 'blockers'
  | 'blockeds'
  | 'polls'
  | 'pollAnswers'
  | 'pollChoosens'
  | 'pollComments'
  | 'reports'
  | 'isReporteds'
  | 'myGroups'
  | 'members'
  | 'setting'
  | 'followings'
  | 'followeds'
  | 'point'
  | 'searchHistories'
  | 'contacts'
  | 'contactInfos'
  | 'snsLinks'

export class User extends Model<
  InferAttributes<User, { omit: UserAssociations }>,
  InferCreationAttributes<User, { omit: UserAssociations }>
> {
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

  // User hasMany UserDevice (as Devices)
  declare deviceSession?: NonAttribute<UserDeviceSession[]>
  declare getDeviceSession: HasManyGetAssociationsMixin<UserDeviceSession>
  declare setDeviceSession: HasManySetAssociationsMixin<
    UserDeviceSession,
    string
  >
  declare addDeviceSessions: HasManyAddAssociationMixin<
    UserDeviceSession,
    string
  >
  declare addDeviceSession: HasManyAddAssociationsMixin<
    UserDeviceSession,
    string
  >
  declare createDeviceSession: HasManyCreateAssociationMixin<UserDeviceSession>
  declare removeDeviceSessions: HasManyRemoveAssociationMixin<
    UserDeviceSession,
    string
  >
  declare removeDeviceSession: HasManyRemoveAssociationsMixin<
    UserDeviceSession,
    string
  >
  declare hasDeviceSessions: HasManyHasAssociationMixin<
    UserDeviceSession,
    string
  >
  declare hasDeviceSession: HasManyHasAssociationsMixin<
    UserDeviceSession,
    string
  >
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

  // User hasMany Poll (as Polls)
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

  // User hasMany PollAnswer (as PollAnswers)
  declare pollAnswers?: NonAttribute<PollAnswer[]>
  declare getPollAnswers: HasManyGetAssociationsMixin<PollAnswer>
  declare setPollAnswers: HasManySetAssociationsMixin<PollAnswer, string>
  declare addPollAnswer: HasManyAddAssociationMixin<PollAnswer, string>
  declare addPollAnswers: HasManyAddAssociationsMixin<PollAnswer, string>
  declare createPollAnswer: HasManyCreateAssociationMixin<PollAnswer>
  declare removePollAnswer: HasManyRemoveAssociationMixin<PollAnswer, string>
  declare removePollAnswers: HasManyRemoveAssociationsMixin<PollAnswer, string>
  declare hasPollAnswer: HasManyHasAssociationMixin<PollAnswer, string>
  declare hasPollAnswers: HasManyHasAssociationsMixin<PollAnswer, string>
  declare countPollAnswers: HasManyCountAssociationsMixin

  // User hasMany PollAnswerChosen (as PollChoosen)
  declare pollChoosens?: NonAttribute<PollAnswerChosen[]>
  declare getPollChoosens: HasManyGetAssociationsMixin<PollAnswerChosen>
  declare setPollChoosens: HasManySetAssociationsMixin<PollAnswerChosen, string>
  declare addPollChoosen: HasManyAddAssociationMixin<PollAnswerChosen, string>
  declare addPollChoosens: HasManyAddAssociationsMixin<PollAnswerChosen, string>
  declare createPollChoosen: HasManyCreateAssociationMixin<PollAnswerChosen>
  declare removePollChoosen: HasManyRemoveAssociationMixin<
    PollAnswerChosen,
    string
  >
  declare removePollChoosens: HasManyRemoveAssociationsMixin<
    PollAnswerChosen,
    string
  >
  declare hasPollChoosen: HasManyHasAssociationMixin<PollAnswerChosen, string>
  declare hasPollChoosens: HasManyHasAssociationsMixin<PollAnswerChosen, string>
  declare countPollChoosens: HasManyCountAssociationsMixin

  // User hasMany PollComment (as PollComments)
  declare pollComments?: NonAttribute<PollComment[]>
  declare getPollComments: HasManyGetAssociationsMixin<PollComment>
  declare setPollComments: HasManySetAssociationsMixin<PollComment, string>
  declare addPollComment: HasManyAddAssociationMixin<PollComment, string>
  declare addPollComments: HasManyAddAssociationsMixin<PollComment, string>
  declare createPollComment: HasManyCreateAssociationMixin<PollComment>
  declare removePollComment: HasManyRemoveAssociationMixin<PollComment, string>
  declare removePollComments: HasManyRemoveAssociationsMixin<
    PollComment,
    string
  >
  declare hasPollComment: HasManyHasAssociationMixin<PollComment, string>
  declare hasPollComments: HasManyHasAssociationsMixin<PollComment, string>
  declare countPollComments: HasManyCountAssociationsMixin

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

  // User hasMany Group (as MyGroups)
  declare myGroups?: NonAttribute<Group[]>
  declare getMyGroups: HasManyGetAssociationsMixin<Group>
  declare setMyGroups: HasManySetAssociationsMixin<Group, string>
  declare addMyGroup: HasManyAddAssociationMixin<Group, string>
  declare addMyGroups: HasManyAddAssociationsMixin<Group, string>
  declare createMyGroup: HasManyCreateAssociationMixin<Group>
  declare removeMyGroup: HasManyRemoveAssociationMixin<Group, string>
  declare removeMyGroups: HasManyRemoveAssociationsMixin<Group, string>
  declare hasMyGroup: HasManyHasAssociationMixin<Group, string>
  declare hasMyGroups: HasManyHasAssociationsMixin<Group, string>
  declare countMyGroups: HasManyCountAssociationsMixin

  // User hasMany GroupMember (as Members)
  declare members?: NonAttribute<GroupMember[]>
  declare getMembers: HasManyGetAssociationsMixin<GroupMember>
  declare setMembers: HasManySetAssociationsMixin<GroupMember, string>
  declare addMember: HasManyAddAssociationMixin<GroupMember, string>
  declare addMembers: HasManyAddAssociationsMixin<GroupMember, string>
  declare createMember: HasManyCreateAssociationMixin<GroupMember>
  declare removeMember: HasManyRemoveAssociationMixin<GroupMember, string>
  declare removeMembers: HasManyRemoveAssociationsMixin<GroupMember, string>
  declare hasMember: HasManyHasAssociationMixin<GroupMember, string>
  declare hasMembers: HasManyHasAssociationsMixin<GroupMember, string>
  declare countMembers: HasManyCountAssociationsMixin

  // User hasOne UserSetting (as Settings)
  declare setting?: NonAttribute<UserSetting>
  declare getSetting: HasOneGetAssociationMixin<UserSetting>
  declare setSetting: HasOneSetAssociationMixin<UserSetting, string>
  declare createSetting: HasOneCreateAssociationMixin<UserSetting>

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

  // User hasOne UserPoint (as Point)
  declare point?: NonAttribute<UserPoint>
  declare getPoint: HasOneGetAssociationMixin<UserPoint>
  declare setPoint: HasOneSetAssociationMixin<UserPoint, string>
  declare createPoint: HasOneCreateAssociationMixin<UserPoint>

  // User hasMany RecommendedCategoryList (as RecommentCategory)
  declare recommentCategories?: NonAttribute<RecommendedCategoryList[]>
  declare getRecommentCategories: HasManyGetAssociationsMixin<RecommendedCategoryList>
  declare setRecommentCategories: HasManySetAssociationsMixin<
    RecommendedCategoryList,
    string
  >
  declare addRecommentCategory: HasManyAddAssociationMixin<
    RecommendedCategoryList,
    string
  >
  declare addRecommentCategories: HasManyAddAssociationsMixin<
    RecommendedCategoryList,
    string
  >
  declare createRecommentCategory: HasManyCreateAssociationMixin<RecommendedCategoryList>
  declare removeRecommentCategory: HasManyRemoveAssociationMixin<
    RecommendedCategoryList,
    string
  >
  declare removeRecommentCategories: HasManyRemoveAssociationsMixin<
    RecommendedCategoryList,
    string
  >
  declare hasRecommentCategory: HasManyHasAssociationMixin<
    RecommendedCategoryList,
    string
  >
  declare hasRecommentCategories: HasManyHasAssociationsMixin<
    RecommendedCategoryList,
    string
  >
  declare countRecommentCategories: HasManyCountAssociationsMixin

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

  // User hasMany UserLinkSNS (as SnsLink)
  declare snsLinks?: NonAttribute<UserLinkSNS[]>
  declare getSnsLinks: HasManyGetAssociationsMixin<UserLinkSNS>
  declare setSnsLinks: HasManySetAssociationsMixin<UserLinkSNS, string>
  declare addSnsLink: HasManyAddAssociationMixin<UserLinkSNS, string>
  declare addSnsLinks: HasManyAddAssociationsMixin<UserLinkSNS, string>
  declare createSnsLink: HasManyCreateAssociationMixin<UserLinkSNS>
  declare removeSnsLink: HasManyRemoveAssociationMixin<UserLinkSNS, string>
  declare removeSnsLinks: HasManyRemoveAssociationsMixin<UserLinkSNS, string>
  declare hasSnsLink: HasManyHasAssociationMixin<UserLinkSNS, string>
  declare hasSnsLinks: HasManyHasAssociationsMixin<UserLinkSNS, string>
  declare countSnsLinks: HasManyCountAssociationsMixin

  declare static associations: {
    deviceSession: Association<User, UserDeviceSession>
    blockers: Association<User, Block>
    blockeds: Association<User, Block>
    polls: Association<User, Poll>
    pollAnswers: Association<User, PollAnswer>
    pollChoosens: Association<User, PollAnswerChosen>
    pollComments: Association<User, PollComment>
    reports: Association<User, ReportUser>
    isReporteds: Association<User, ReportUser>
    myGroups: Association<User, Group>
    members: Association<User, GroupMember>
    setting: Association<User, UserSetting>
    followings: Association<User, Follow>
    followeds: Association<User, Follow>
    point: Association<User, UserPoint>
    recommentCategories: Association<User, RecommendedCategoryList>
    searchHistories: Association<User, SearchHistory>
    contacts: Association<User, ContactList>
    contactInfos: Association<User, ContactList>
    snsLinks: Association<User, UserLinkSNS>
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
          unique: true,
        },
        avatar: {
          type: DataTypes.STRING(),
        },
        inviteCode: {
          type: DataTypes.STRING(20),
          unique: true,
        },
        refCode: {
          type: DataTypes.STRING(20),
          unique: true,
        },
        gender: {
          type: DataTypes.STRING(10),
        },
        instagram: {
          type: DataTypes.STRING(100),
        },
        mbti: {
          type: DataTypes.ENUM(
            'INTJ',
            'INTP',
            'ENTJ',
            'ENTP',
            'INFJ',
            'INFP',
            'ENFJ',
            'ENFP',
            'ISTJ',
            'ISFJ',
            'ESTI',
            'ESFJ',
            'ISTP',
            'ISFP',
            'ESTP',
            'ESFP',
          ),
        },
        identify: {
          type: DataTypes.STRING(100),
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
        },
      },
    )

    return User
  }
}
