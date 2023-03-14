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
import { sequelize } from '@/config/sql.config'

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

  User.hasMany(UserDevice, {
    as: 'devices',
    foreignKey: 'user_id',
  })
  User.hasMany(Block, {
    as: 'blockers',
    foreignKey: 'blocker_id',
  })
  User.hasMany(Block, {
    as: 'blockeds',
    foreignKey: 'blocked_id',
  })
  User.hasMany(Poll, {
    as: 'polls',
    foreignKey: 'user_id',
  })
  User.hasMany(PollAnswer, {
    as: 'pollAnswers',
    foreignKey: 'user_id',
  })
  User.hasMany(PollAnswerChosen, {
    as: 'pollChoosens',
    foreignKey: 'user_id',
  })
  User.hasMany(PollComment, {
    as: 'pollComments',
    foreignKey: 'user_id',
  })
  User.hasMany(ReportUser, {
    as: 'reports',
    foreignKey: 'reporter_id',
  })
  User.hasMany(ReportUser, {
    as: 'isReporteds',
    foreignKey: 'reported_id',
  })
  User.hasMany(Group, {
    as: 'myGroups',
    foreignKey: 'owner_id',
  })
  User.hasMany(GroupMember, {
    as: 'members',
    foreignKey: 'user_id',
  })
  User.hasOne(UserSetting, {
    as: 'setting',
    foreignKey: 'user_id',
  })
  Poll.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  Poll.belongsTo(PollCategory, {
    as: 'category',
    foreignKey: 'category_id',
  })
  Poll.hasMany(ReportPoll, {
    as: 'reports',
    foreignKey: 'poll_id',
  })
  Poll.hasMany(PollComment, {
    as: 'comments',
    foreignKey: 'poll_id',
  })
  Poll.hasMany(PollHashtag, {
    as: 'pollHashtags',
    foreignKey: 'poll_id',
  })
  Poll.hasMany(PollMention, {
    as: 'mentions',
    foreignKey: 'poll_id',
  })
  Poll.hasMany(Like, {
    as: 'likes',
    foreignKey: 'poll_id',
  })
  PollAnswer.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id',
  })
  PollAnswer.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  PollAnswer.hasMany(PollAnswerChosen, {
    as: 'choosens',
    foreignKey: 'poll_answer_id',
  })
  PollAnswerChosen.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  PollAnswerChosen.belongsTo(PollAnswer, {
    as: 'pollAnswer',
    foreignKey: 'poll_anwser_id',
  })
  PollComment.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id',
  })
  PollComment.belongsTo(PollComment, {
    as: 'parent',
    foreignKey: 'parent_id',
  })
  PollComment.hasMany(PollCommentMention, {
    as: 'mentions',
    foreignKey: 'poll_comment_id',
  })
  PollComment.hasMany(PollCommentHashtag, {
    as: 'hashtags',
    foreignKey: 'poll_comment_id',
  })
  PollComment.hasMany(Like, {
    as: 'likes',
    foreignKey: 'poll_comment_id',
  })
  PollCategory.hasMany(Poll, {
    as: 'polls',
    foreignKey: 'poll_category_id',
  })
  UserDevice.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  Block.belongsTo(User, {
    as: 'user',
    foreignKey: 'blocker_id',
  })
  Block.belongsTo(User, {
    as: 'blocked',
    foreignKey: 'blocked_id',
  })
  ReportUser.belongsTo(User, {
    as: 'user',
    foreignKey: 'reporter_id',
  })
  ReportUser.belongsTo(User, {
    as: 'reported',
    foreignKey: 'reported_id',
  })
  ReportPoll.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  ReportPoll.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id',
  })
  PollHashtag.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id',
  })
  PollHashtag.belongsTo(Hashtag, {
    as: 'hashtag',
    foreignKey: 'hashtag_id',
  })
  PollMention.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id',
  })
  PollMention.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  PollCommentMention.belongsTo(PollComment, {
    as: 'comment',
    foreignKey: 'poll_comment_id',
  })
  PollCommentMention.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  PollCommentMention.belongsTo(User, {
    as: 'mentioned',
    foreignKey: 'mentioned_id',
  })
  PollCommentHashtag.belongsTo(PollComment, {
    as: 'pollComment',
    foreignKey: 'poll_comment_id',
  })
  PollCommentHashtag.belongsTo(Hashtag, {
    as: 'hashtag',
    foreignKey: 'hashtag_id',
  })
  Session.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  Like.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id',
  })
  Like.belongsTo(PollComment, {
    as: 'comment',
    foreignKey: 'poll_comment_id',
  })
  Like.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  Group.belongsTo(User, {
    as: 'user',
    foreignKey: 'owner_id',
  })
  Group.hasMany(GroupMember, {
    as: 'members',
    foreignKey: 'group_id',
  })
  Group.hasOne(GroupSetting, {
    as: 'groupSetting',
    foreignKey: 'group_id',
  })
  GroupMember.belongsTo(Group, {
    as: 'group',
    foreignKey: 'group_id',
  })
  GroupMember.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  GroupMember.hasOne(GroupMemberSetting, {
    as: 'setting',
    foreignKey: 'group_member_id',
  })
  GroupMemberSetting.belongsTo(GroupMember, {
    as: 'member',
    foreignKey: 'group_member_id',
  })
  GroupSetting.belongsTo(Group, {
    as: 'group',
    foreignKey: 'group_id',
  })
  UserSetting.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
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
  }
}
