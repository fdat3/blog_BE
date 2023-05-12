import { Blog } from './Blog'
import { UpVote } from './UpVote'
import { Comment } from './Comment'
import { Setting } from './Setting'
import { Banner } from './Banner'
import { Theme } from './Theme'
import { User } from './User'
import { DownVote } from './DownVote'
import { sequelize } from '@/config/sql.config'

export { Blog, UpVote, Comment, Setting, Banner, Theme, User, DownVote }

export const initModels = (): any => {
  Blog.initModel(sequelize)
  UpVote.initModel(sequelize)
  Comment.initModel(sequelize)
  Setting.initModel(sequelize)
  Banner.initModel(sequelize)
  Theme.initModel(sequelize)
  User.initModel(sequelize)
  DownVote.initModel(sequelize)

  Blog.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'blog_id',
  })
  Blog.hasMany(UpVote, {
    as: 'votes',
    foreignKey: 'blog_id',
  })
  UpVote.belongsTo(Blog, {
    as: 'blogFkId',
    foreignKey: 'blog_id',
  })
  UpVote.belongsTo(User, {
    as: 'userFkId',
    foreignKey: 'user_id',
  })
  UpVote.belongsTo(Comment, {
    as: 'commentFkId',
    foreignKey: 'comment_id',
  })
  Comment.belongsTo(Blog, {
    as: 'blogFkId',
    foreignKey: 'blog_id',
  })
  Comment.belongsTo(User, {
    as: 'userFkId',
    foreignKey: 'user_id',
  })
  Comment.hasMany(UpVote, {
    as: 'upVotes',
    foreignKey: 'comment_id',
  })
  Comment.hasMany(DownVote, {
    as: 'downVotes',
    foreignKey: 'comment_id',
  })
  Setting.hasOne(Banner, {
    as: 'banner',
    foreignKey: 'id',
  })
  Setting.hasOne(Theme, {
    as: 'theme',
    foreignKey: 'id',
  })
  Banner.belongsTo(Setting, {
    as: 'bannerId',
    foreignKey: 'banner_id',
  })
  Theme.belongsTo(Setting, {
    as: 'themeId',
    foreignKey: 'theme_id',
  })
  User.hasMany(UpVote, {
    as: 'upVotes',
    foreignKey: 'user_id',
  })
  User.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'user_id',
  })
  User.hasMany(Blog, {
    as: 'blogs',
    foreignKey: 'user_id',
  })
  DownVote.belongsTo(Blog, {
    as: 'blogFkId',
    foreignKey: 'blog_id',
  })
  DownVote.belongsTo(User, {
    as: 'userFkId',
    foreignKey: 'user_id',
  })
  DownVote.belongsTo(Comment, {
    as: 'commentFkId',
    foreignKey: 'comment_id',
  })

  return {
    Blog,
    UpVote,
    Comment,
    Setting,
    Banner,
    Theme,
    User,
    DownVote,
  }
}
