import { Employee } from './Employee'
import { Blog } from './Blog'
import { UpVote } from './UpVote'
import { Comment } from './Comment'
import { Setting } from './Setting'
import { Banner } from './Banner'
import { Theme } from './Theme'
import { User } from './User'
import { sequelize } from '@/config/sql.config'

export { Employee, Blog, UpVote, Comment, Setting, Banner, Theme, User }

export const initModels = (): any => {
  Employee.initModel(sequelize)
  Blog.initModel(sequelize)
  UpVote.initModel(sequelize)
  Comment.initModel(sequelize)
  Setting.initModel(sequelize)
  Banner.initModel(sequelize)
  Theme.initModel(sequelize)
  User.initModel(sequelize)

  Employee.hasMany(UpVote, {
    as: 'empLikes',
    foreignKey: 'employee_id',
  })
  Employee.hasMany(Comment, {
    as: 'empComments',
    foreignKey: 'employee_id',
  })
  Employee.hasMany(Blog, {
    as: 'empBlogs',
    foreignKey: 'employee_id',
  })
  Blog.hasMany(UpVote, {
    as: 'upVotes',
    foreignKey: 'blog_id',
  })
  Blog.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'blog_id',
  })
  UpVote.hasOne(Comment, {
    as: 'comment',
    foreignKey: 'comment_id',
  })
  UpVote.belongsTo(Blog, {
    as: 'blogFkId',
    foreignKey: 'id',
  })
  UpVote.belongsTo(Employee, {
    as: 'empId',
    foreignKey: 'id',
  })
  UpVote.belongsTo(User, {
    as: 'userFkId',
    foreignKey: 'id',
  })
  Comment.belongsTo(Blog, {
    as: 'blogFkId',
    foreignKey: 'id',
  })
  Comment.belongsTo(Employee, {
    as: 'empId',
    foreignKey: 'id',
  })
  Comment.belongsTo(User, {
    as: 'userFkId',
    foreignKey: 'id',
  })
  Comment.belongsTo(Comment, {
    as: 'parentFkId',
    foreignKey: 'id',
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

  return {
    Employee,
    Blog,
    UpVote,
    Comment,
    Setting,
    Banner,
    Theme,
    User,
  }
}
