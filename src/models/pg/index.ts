import { User } from './User'
import { Poll } from './Poll'
import { PollAnswer } from './PollAnswer'
import { PollAnswerChosen } from './PollAnswerChosen'
import { PollComment } from './PollComment'
import { PollCategory } from './PollCategory'
import { UserDevice } from './UserDevice'
import { Block } from './Block'
import { ReportUser } from './ReportUser'
import { ReportPoll } from './ReportPoll'
import { Hashtag } from './Hashtag'
import { PollHashtag } from './PollHashtag'
import { PollMention } from './PollMention'
import { PollCommentMention } from './PollCommentMention'
import { PollCommentHashtag } from './PollCommentHashtag'
import { Session } from './Session'
import { Like } from './Like'
import { Group } from './Group'
import { GroupMember } from './GroupMember'
import { GroupMemberSetting } from './GroupMemberSetting'
import { GroupSetting } from './GroupSetting'
import { UserSetting } from './UserSetting'
import { Follow } from './Follow'
import { UserPoint } from './UserPoint'
import { UserPointHistory } from './UserPointHistory'
import { sequelize } from '@/config/sql.config'
import { GlobalPoint } from '@/models/pg/GlobalPoint'
import { RecommendedCategoryList } from '@/models/pg/RecommendedCategoryList'
import { SearchHistory } from '@/models/pg/SearchHistory'
import { ContactList } from './ContactList'
import { PollEntity } from './PollEntity'
import { UserLinkSNS } from './UserLinkSNS'

export {
  User,
  Poll,
  PollAnswer,
  PollAnswerChosen,
  PollComment,
  PollCategory,
  UserDevice,
  Block,
  ReportUser,
  ReportPoll,
  Hashtag,
  PollHashtag,
  PollMention,
  PollCommentMention,
  PollCommentHashtag,
  Session,
  Like,
  Group,
  GroupMember,
  GroupMemberSetting,
  GroupSetting,
  UserSetting,
  Follow,
  UserPoint,
  UserPointHistory,
  GlobalPoint,
  RecommendedCategoryList,
  SearchHistory,
  ContactList,
  PollEntity,
  UserLinkSNS,
}

export const initModels = (): any => {
  User.initModel(sequelize)
  Poll.initModel(sequelize)
  PollAnswer.initModel(sequelize)
  PollAnswerChosen.initModel(sequelize)
  PollComment.initModel(sequelize)
  PollCategory.initModel(sequelize)
  UserDevice.initModel(sequelize)
  Block.initModel(sequelize)
  ReportUser.initModel(sequelize)
  ReportPoll.initModel(sequelize)
  Hashtag.initModel(sequelize)
  PollHashtag.initModel(sequelize)
  PollMention.initModel(sequelize)
  PollCommentMention.initModel(sequelize)
  PollCommentHashtag.initModel(sequelize)
  Session.initModel(sequelize)
  Like.initModel(sequelize)
  Group.initModel(sequelize)
  GroupMember.initModel(sequelize)
  GroupMemberSetting.initModel(sequelize)
  GroupSetting.initModel(sequelize)
  UserSetting.initModel(sequelize)
  Follow.initModel(sequelize)
  UserPoint.initModel(sequelize)
  UserPointHistory.initModel(sequelize)
  GlobalPoint.initModel(sequelize)
  RecommendedCategoryList.initModel(sequelize)
  SearchHistory.initModel(sequelize)
  ContactList.initModel(sequelize)
  PollEntity.initModel(sequelize)
  UserLinkSNS.initModel(sequelize)

  User.hasMany(UserDevice, {
    as: 'devices',
    foreignKey: 'userId',
  })
  User.hasMany(Block, {
    as: 'blockers',
    foreignKey: 'blockerId',
  })
  User.hasMany(Block, {
    as: 'blockeds',
    foreignKey: 'blockedId',
  })
  User.hasMany(Poll, {
    as: 'polls',
    foreignKey: 'userId',
  })
  User.hasMany(PollAnswerChosen, {
    as: 'pollChoosens',
    foreignKey: 'userId',
  })
  User.hasMany(PollComment, {
    as: 'pollComments',
    foreignKey: 'userId',
  })
  User.hasMany(ReportUser, {
    as: 'reports',
    foreignKey: 'reporterId',
  })
  User.hasMany(ReportUser, {
    as: 'isReporteds',
    foreignKey: 'reportedId',
  })
  User.hasMany(Group, {
    as: 'myGroups',
    foreignKey: 'ownerId',
  })
  User.hasMany(GroupMember, {
    as: 'members',
    foreignKey: 'userId',
  })
  User.hasOne(UserSetting, {
    as: 'setting',
    foreignKey: 'userId',
  })
  User.hasMany(Follow, {
    as: 'followings',
    foreignKey: 'userId',
  })
  User.hasMany(Follow, {
    as: 'followeds',
    foreignKey: 'followedId',
  })
  User.hasOne(UserPoint, {
    as: 'point',
    foreignKey: 'userId',
  })
  User.hasMany(RecommendedCategoryList, {
    as: 'recommentCategories',
    foreignKey: 'userId',
  })
  User.hasMany(ContactList, {
    as: 'contacts',
    foreignKey: 'userId',
  })
  User.hasMany(ContactList, {
    as: 'contactInfos',
    foreignKey: 'contactId',
  })
  User.hasMany(UserLinkSNS, {
    as: 'sns_link',
    foreignKey: 'userId',
  })
  Poll.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  Poll.belongsTo(PollCategory, {
    as: 'category',
    foreignKey: 'categoryId',
  })
  Poll.hasMany(ReportPoll, {
    as: 'reports',
    foreignKey: 'pollId',
  })
  Poll.hasMany(PollComment, {
    as: 'comments',
    foreignKey: 'pollId',
  })
  Poll.hasMany(PollHashtag, {
    as: 'hashtags',
    foreignKey: 'pollId',
  })
  Poll.hasMany(PollMention, {
    as: 'mentions',
    foreignKey: 'pollId',
  })
  Poll.hasMany(Like, {
    as: 'likes',
    foreignKey: 'pollId',
  })
  Poll.hasMany(PollAnswer, {
    as: 'answers',
    foreignKey: 'pollId',
  })
  Poll.hasMany(PollEntity, {
    as: 'entities',
    foreignKey: 'pollId',
  })
  PollAnswer.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'pollId',
  })
  PollAnswer.hasMany(PollAnswerChosen, {
    as: 'choosens',
    foreignKey: 'pollAnswerId',
  })
  PollAnswerChosen.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  PollComment.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'pollId',
  })
  PollComment.belongsTo(PollComment, {
    as: 'parent',
    foreignKey: 'parentId',
  })
  PollComment.hasMany(PollCommentMention, {
    as: 'mentions',
    foreignKey: 'pollCommentId',
  })
  PollComment.hasMany(PollCommentHashtag, {
    as: 'hashtags',
    foreignKey: 'pollCommentId',
  })
  PollComment.hasMany(Like, {
    as: 'likes',
    foreignKey: 'pollCommentId',
  })
  PollCategory.hasMany(Poll, {
    as: 'polls',
    foreignKey: 'categoryId',
  })
  PollCategory.hasMany(RecommendedCategoryList, {
    as: 'recommends',
    foreignKey: 'pollCategoryId',
  })
  UserDevice.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  Block.belongsTo(User, {
    as: 'user',
    foreignKey: 'blockerId',
  })
  Block.belongsTo(User, {
    as: 'blocked',
    foreignKey: 'blockedId',
  })
  ReportUser.belongsTo(User, {
    as: 'user',
    foreignKey: 'reporterId',
  })
  ReportUser.belongsTo(User, {
    as: 'reported',
    foreignKey: 'reportedId',
  })
  ReportPoll.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  ReportPoll.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'pollId',
  })
  PollHashtag.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'pollId',
  })
  PollHashtag.belongsTo(Hashtag, {
    as: 'hashtag',
    foreignKey: 'hashtagId',
  })
  PollMention.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'pollId',
  })
  PollMention.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  PollCommentMention.belongsTo(PollComment, {
    as: 'comment',
    foreignKey: 'pollCommentId',
  })
  PollCommentMention.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  PollCommentMention.belongsTo(User, {
    as: 'mentioned',
    foreignKey: 'mentionedId',
  })
  PollCommentHashtag.belongsTo(PollComment, {
    as: 'pollComment',
    foreignKey: 'pollCommentId',
  })
  PollCommentHashtag.belongsTo(Hashtag, {
    as: 'hashtag',
    foreignKey: 'hashtagId',
  })
  Session.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  Like.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'pollId',
  })
  Like.belongsTo(PollComment, {
    as: 'comment',
    foreignKey: 'pollCommentId',
  })
  Like.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  Group.belongsTo(User, {
    as: 'user',
    foreignKey: 'ownerId',
  })
  Group.hasMany(GroupMember, {
    as: 'members',
    foreignKey: 'groupId',
  })
  Group.hasOne(GroupSetting, {
    as: 'settings',
    foreignKey: 'groupId',
  })
  GroupMember.belongsTo(Group, {
    as: 'group',
    foreignKey: 'groupId',
  })
  GroupMember.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  GroupMember.hasOne(GroupMemberSetting, {
    as: 'settings',
    foreignKey: 'groupMemberId',
  })
  GroupMemberSetting.belongsTo(GroupMember, {
    as: 'member',
    foreignKey: 'groupMemberId',
  })
  GroupSetting.belongsTo(Group, {
    as: 'group',
    foreignKey: 'groupId',
  })
  UserSetting.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  Follow.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  Follow.belongsTo(User, {
    as: 'followed',
    foreignKey: 'followedId',
  })
  UserPoint.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  UserPoint.hasMany(UserPointHistory, {
    as: 'histories',
    foreignKey: 'userPointId',
  })
  UserPointHistory.belongsTo(UserPoint, {
    as: 'parent',
    foreignKey: 'userPointId',
  })
  RecommendedCategoryList.belongsTo(PollCategory, {
    as: 'category',
    foreignKey: 'pollCategoryId',
  })
  RecommendedCategoryList.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  SearchHistory.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  ContactList.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })
  ContactList.belongsTo(User, {
    as: 'contactInfo',
    foreignKey: 'contactId',
  })
  PollEntity.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'pollId',
  })
  UserLinkSNS.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })

  return {
    User,
    Poll,
    PollAnswer,
    PollAnswerChosen,
    PollComment,
    PollCategory,
    UserDevice,
    Block,
    ReportUser,
    ReportPoll,
    Hashtag,
    PollHashtag,
    PollMention,
    PollCommentMention,
    PollCommentHashtag,
    Session,
    Like,
    Group,
    GroupMember,
    GroupMemberSetting,
    GroupSetting,
    UserSetting,
    Follow,
    UserPoint,
    UserPointHistory,
    GlobalPoint,
    RecommendedCategoryList,
    SearchHistory,
    ContactList,
    PollEntity,
    UserLinkSNS,
  }
}
