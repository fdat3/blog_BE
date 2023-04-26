import { User } from './User'
import { Block } from './Block'
import { ReportUser } from './ReportUser'
import { Like } from './Like'
import { Follow } from './Follow'
import { sequelize } from '@/config/sql.config'
import { SearchHistory } from '@/models/pg/SearchHistory'
import { ContactList } from './ContactList'
import { Transaction } from './Transaction'
import { Employee } from './Employee'
import { Blog } from './Blog'
import { Setting } from './Setting'
import { Banner } from './Banner'
import { Theme } from './Theme'
// import { Comment } from './Comment'

export {
  User,
  Block,
  ReportUser,
  Follow,
  SearchHistory,
  ContactList,
  Transaction,
  Employee,
  Blog,
  Like,
  // Comment,
  Setting,
  Banner,
  Theme,
}

export const initModels = (): any => {
  User.initModel(sequelize)
  Block.initModel(sequelize)
  ReportUser.initModel(sequelize)
  Like.initModel(sequelize)
  Follow.initModel(sequelize)
  SearchHistory.initModel(sequelize)
  ContactList.initModel(sequelize)
  Transaction.initModel(sequelize)
  Employee.initModel(sequelize)
  Blog.initModel(sequelize)
  Like.initModel(sequelize)
  // Comment.initModel(sequelize)
  Setting.initModel(sequelize)
  Banner.initModel(sequelize)
  Theme.initModel(sequelize)

  User.hasMany(Block, {
    as: 'blockers',
    foreignKey: 'blockerId',
  })
  User.hasMany(Block, {
    as: 'blockeds',
    foreignKey: 'blockedId',
  })
  User.hasMany(ReportUser, {
    as: 'reports',
    foreignKey: 'reporterId',
  })
  User.hasMany(ReportUser, {
    as: 'isReporteds',
    foreignKey: 'reportedId',
  })
  User.hasMany(Follow, {
    as: 'followings',
    foreignKey: 'userId',
  })
  User.hasMany(Follow, {
    as: 'followeds',
    foreignKey: 'followedId',
  })
  User.hasMany(ContactList, {
    as: 'contacts',
    foreignKey: 'userId',
  })
  User.hasMany(ContactList, {
    as: 'contactInfos',
    foreignKey: 'contactId',
  })
  User.hasMany(Transaction, {
    as: 'transactions',
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
  Like.belongsTo(User, {
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
  Transaction.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
  })

  // Blog
  Employee.hasMany(Like, {
    as: 'empLikes',
    foreignKey: 'employee_id',
  })
  // Employee.hasMany(Comment, {
  //   as: 'empComments',
  //   foreignKey: 'employee_id'
  // })
  Employee.hasMany(Blog, {
    as: 'empBlogs',
    foreignKey: 'employee_id',
  })
  Blog.hasMany(Like, {
    as: 'likes',
    foreignKey: 'blog_id',
  })
  // Blog.hasMany(Comment, {
  //   as: 'comments',
  //   foreignKey: 'blog_id'
  // })
  // Like.hasOne(Comment, {
  //   as: 'comment',
  //   foreignKey: 'comment_id'
  // })
  Like.belongsTo(Blog, {
    as: 'blogId',
    foreignKey: 'id',
  })
  Like.belongsTo(Employee, {
    as: 'empId',
    foreignKey: 'id',
  })
  Like.belongsTo(User, {
    as: 'userLikeId',
    foreignKey: 'id',
  })
  // Comment.belongsTo(Blog, {
  //   as: 'blogId',
  //   foreignKey: 'id'
  // })
  // Comment.belongsTo(Employee, {
  //   as: 'empId',
  //   foreignKey: 'id'
  // })
  // Comment.belongsTo(User, {
  //   as: 'userId',
  //   foreignKey: 'id'
  // })
  // Comment.belongsTo(Comment, {
  //   as: 'parentId',
  //   foreignKey: 'id'
  // })
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

  return {
    User,
    Block,
    ReportUser,
    Like,
    Follow,
    SearchHistory,
    ContactList,
    Transaction,
    Employee,
    Blog,
    // Comment,
    Setting,
    Banner,
    Theme,
  }
}
