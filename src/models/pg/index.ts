import { Blog } from './Blog'
import { Vote } from './Vote'
import { Comment } from './Comment'
import { Setting } from './Setting'
import { Banner } from './Banner'
import { Theme } from './Theme'
import { User } from './User'
import { sequelize } from '@/config/sql.config'

export { Blog, Vote, Comment, Setting, Banner, Theme, User }

export const initModels = (): any => {
  Blog.initModel(sequelize)
  Vote.initModel(sequelize)
  Comment.initModel(sequelize)
  Setting.initModel(sequelize)
  Banner.initModel(sequelize)
  Theme.initModel(sequelize)
  User.initModel(sequelize)

  Blog.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'blog_id',
  })
  Blog.hasMany(Vote, {
    as: 'votes',
    foreignKey: 'blog_id',
  })
  Blog.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  Vote.belongsTo(Blog, {
    as: 'blogFkId',
    foreignKey: 'blog_id',
  })
  Vote.belongsTo(User, {
    as: 'userFkId',
    foreignKey: 'user_id',
  })
  Vote.belongsTo(Comment, {
    as: 'commentFkId',
    foreignKey: 'comment_id',
  })
  Comment.belongsTo(Blog, {
    as: 'blogFkId',
    foreignKey: 'blog_id',
  })
  Comment.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
  })
  Comment.hasMany(Vote, {
    as: 'votes',
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
  User.hasMany(Vote, {
    as: 'votes',
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

  return {
    Blog,
    Vote,
    Comment,
    Setting,
    Banner,
    Theme,
    User,
  }
}
