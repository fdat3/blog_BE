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
import { sequelize } from '@/config/sql.config'


export function initModels(): any {
  User.initModel(sequelize)
  Poll.initModel(sequelize)
  PollAnswer.initModel(sequelize)
  PollAnswerChosen.initModel(sequelize)
  PollComment.initModel(sequelize)
  Mbti.initModel(sequelize)
  PollCategory.initModel(sequelize)
  UserDevice.initModel(sequelize)
  Block.initModel(sequelize)
  ReportUser.initModel(sequelize)
  ReportPoll.initModel(sequelize)

  Mbti.hasMany(User, {
    as: 'users',
    foreignKey: "mbti_id"
  })


  PollAnswer.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id'
  })
  PollAnswer.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })
  PollAnswer.hasMany(PollAnswerChosen, {
    as: 'chosens',
    foreignKey: 'poll_answer_id'
  })
  PollAnswerChosen.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })
  PollAnswerChosen.belongsTo(PollAnswer, {
    as: 'pollAnswer',
    foreignKey: 'poll_anwser_id'
  })
  PollComment.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id'
  })
  PollComment.belongsTo(PollComment, {
    as: 'parent',
    foreignKey: 'id'
  })
  UserDevice.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })
  // Block.belongsTo(User, {
  //   as: 'user',
  //   foreignKey: 'blocker_id',
  //   constraints: false
  // })
  // Block.hasOne(User, {
  //   as: 'blocked',
  //   foreignKey: 'blocked_id',
  //   constraints: false
  // })
  // ReportUser.belongsTo(User, {
  //   as: 'user',
  //   foreignKey: 'reporter_id',
  //   constraints: false
  // })
  // ReportUser.hasOne(User, {
  //   as: 'reported',
  //   foreignKey: 'reported_id',
  //   constraints: false
  // })
  ReportPoll.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })
  ReportPoll.belongsTo(Poll, {
    as: 'poll',
    foreignKey: 'poll_id'
  })
  Poll.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })
  Poll.belongsTo(PollCategory, {
    as: 'category',
    foreignKey: 'category_id'
  })
  Poll.belongsTo(ReportPoll, {
    as: 'report',
    foreignKey: 'poll_id'
  })
  Poll.hasMany(PollComment, {
    as: 'comments',
    foreignKey: 'poll_id'
  })
  Poll.hasMany(PollAnswer, {
    as: 'answer',
    foreignKey: 'poll_id'
  })
  User.hasOne(Mbti, {
    as: 'mbti',
    sourceKey: 'mbti_id',
    foreignKey: 'id'
  })
  User.hasMany(UserDevice, {
    as: 'devices',
    foreignKey: 'user_id',
    hooks: false
  })
  User.hasMany(Block, {
    as: 'blockers',
    foreignKey: 'blocked_id'
  })
  User.hasMany(Block, {
    as: 'blockeds',
    foreignKey: 'blocker_id'
  })
  User.hasMany(Poll, {
    as: 'polls',
    foreignKey: 'user_id',
  })
  User.hasMany(PollAnswer, {
    as: 'pollAnswers',
    foreignKey: 'user_id'
  })
  User.hasMany(PollAnswerChosen, {
    as: 'pollChoosens',
    foreignKey: 'user_id'
  })
  User.hasMany(PollComment, {
    as: 'pollComments',
    foreignKey: 'user_id'
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
    ReportPoll
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
  ReportPoll
}