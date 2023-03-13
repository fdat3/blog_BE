import { User } from './User'
import { Poll } from './Poll'
import { PollAnswer } from './PollAnswer'
import { PollAnswerChosen } from './PollAnswerChosen'
import { PollComment } from './PollComment'
import { Mbti } from './Mbti'
import { PollCategory } from './PollCategory'
import { UserDevice } from './UserDevice'
import { Block } from './Block'
import { ReportUser } from './ReportUser'
import { ReportPoll } from './ReportPoll'
import { Hashtag } from './Hashtag'
import { sequelize } from '@/config/sql.config'
import { PollHashtag } from '@/models/pg/PollHashtag'
import { PollMention } from '@/models/pg/PollMention'
import { PollCommentMention } from './PollCommentMention'
import { PollCommentHashtag } from './PollCommentHashtag'

export function initModels(): any {
  UserDevice.initModel(sequelize)
  PollAnswer.initModel(sequelize)
  PollAnswerChosen.initModel(sequelize)
  PollComment.initModel(sequelize)
  Mbti.initModel(sequelize)
  PollCategory.initModel(sequelize)
  Block.initModel(sequelize)
  ReportUser.initModel(sequelize)
  ReportPoll.initModel(sequelize)
  User.initModel(sequelize)
  Poll.initModel(sequelize)
  Hashtag.initModel(sequelize)
  PollHashtag.initModel(sequelize)
  PollMention.initModel(sequelize)
  PollCommentMention.initModel(sequelize)
  PollCommentHashtag.initModel(sequelize)

  Mbti.hasMany(User, {
    as: 'users',
    foreignKey: 'mbti_id',
  })

  User.belongsTo(Mbti, {
    as: 'mbti',
    foreignKey: 'mbti_id',
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
    as: 'chosens',
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
    foreignKey: 'id',
  })
  UserDevice.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  Block.belongsTo(User, {
    as: 'user',
    foreignKey: 'blocker_id',
    constraints: false,
  })
  Block.hasOne(User, {
    as: 'blocked',
    foreignKey: 'blocked_id',
    constraints: false,
  })
  ReportUser.belongsTo(User, {
    as: 'user',
    foreignKey: 'reporter_id',
    constraints: false,
  })
  ReportUser.belongsTo(User, {
    as: 'reported',
    foreignKey: 'reported_id',
    constraints: false,
  })
  ReportPoll.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  ReportPoll.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id',
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
  Poll.hasMany(PollAnswer, {
    as: 'answer',
    foreignKey: 'poll_id',
  })
  User.hasMany(UserDevice, {
    as: 'devices',
    foreignKey: 'user_id',
  })
  User.hasMany(Block, {
    as: 'blockers',
    foreignKey: 'blocked_id',
  })
  User.hasMany(Block, {
    as: 'blockeds',
    foreignKey: 'blocker_id',
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
  Poll.hasMany(PollHashtag, {
    as: 'poll_hashtag',
    foreignKey: 'poll_id',
  })
  Hashtag.hasMany(PollHashtag, {
    as: 'poll_hashtag',
    foreignKey: 'hashtag_id',
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
    foreignKey: 'comment_id',
  })
  PollCommentHashtag.belongsTo(Hashtag, {
    as: 'hashtag',
    foreignKey: 'hashtag_id',
  })
  User.hasMany(ReportUser, {
    as: 'reports',
    foreignKey: 'user_id',
  })
  User.hasMany(ReportUser, {
    as: 'isReporteds',
    foreignKey: 'reported_id',
  })
  return {
    User,
    Poll,
    PollAnswer,
    PollAnswerChosen,
    PollComment,
    Mbti,
    PollCategory,
    UserDevice,
    Block,
    ReportUser,
    ReportPoll,
    PollMention,
    Hashtag,
    PollCommentMention,
    PollCommentHashtag,
  }
}

export {
  User,
  Poll,
  PollAnswer,
  PollAnswerChosen,
  PollComment,
  Mbti,
  PollCategory,
  UserDevice,
  Block,
  ReportUser,
  ReportPoll,
  PollMention,
  Hashtag,
  PollCommentMention,
  PollCommentHashtag,
}