import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Blog } from './Blog'
import type { Comment } from './Comment'
import type { UpVote } from './UpVote'

type EmployeeAssociations = 'empLikes' | 'empComments' | 'empBlogs'

export class Employee extends Model<
  InferAttributes<Employee, { omit: EmployeeAssociations }>,
  InferCreationAttributes<Employee, { omit: EmployeeAssociations }>
> {
  declare id: CreationOptional<number>
  declare fullname: string | null
  declare email: string | null
  declare password: string | null
  declare dob: Date | null
  declare role: string | null
  declare avatar: string | null
  declare active: boolean | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Employee hasMany UpVote (as EmpLike)
  declare empLikes?: NonAttribute<UpVote[]>
  declare getEmpLikes: HasManyGetAssociationsMixin<UpVote>
  declare setEmpLikes: HasManySetAssociationsMixin<UpVote, number>
  declare addEmpLike: HasManyAddAssociationMixin<UpVote, number>
  declare addEmpLikes: HasManyAddAssociationsMixin<UpVote, number>
  declare createEmpLike: HasManyCreateAssociationMixin<UpVote>
  declare removeEmpLike: HasManyRemoveAssociationMixin<UpVote, number>
  declare removeEmpLikes: HasManyRemoveAssociationsMixin<UpVote, number>
  declare hasEmpLike: HasManyHasAssociationMixin<UpVote, number>
  declare hasEmpLikes: HasManyHasAssociationsMixin<UpVote, number>
  declare countEmpLikes: HasManyCountAssociationsMixin

  // Employee hasMany Comment (as EmpComment)
  declare empComments?: NonAttribute<Comment[]>
  declare getEmpComments: HasManyGetAssociationsMixin<Comment>
  declare setEmpComments: HasManySetAssociationsMixin<Comment, number>
  declare addEmpComment: HasManyAddAssociationMixin<Comment, number>
  declare addEmpComments: HasManyAddAssociationsMixin<Comment, number>
  declare createEmpComment: HasManyCreateAssociationMixin<Comment>
  declare removeEmpComment: HasManyRemoveAssociationMixin<Comment, number>
  declare removeEmpComments: HasManyRemoveAssociationsMixin<Comment, number>
  declare hasEmpComment: HasManyHasAssociationMixin<Comment, number>
  declare hasEmpComments: HasManyHasAssociationsMixin<Comment, number>
  declare countEmpComments: HasManyCountAssociationsMixin

  // Employee hasMany Blog (as EmpBlog)
  declare empBlogs?: NonAttribute<Blog[]>
  declare getEmpBlogs: HasManyGetAssociationsMixin<Blog>
  declare setEmpBlogs: HasManySetAssociationsMixin<Blog, number>
  declare addEmpBlog: HasManyAddAssociationMixin<Blog, number>
  declare addEmpBlogs: HasManyAddAssociationsMixin<Blog, number>
  declare createEmpBlog: HasManyCreateAssociationMixin<Blog>
  declare removeEmpBlog: HasManyRemoveAssociationMixin<Blog, number>
  declare removeEmpBlogs: HasManyRemoveAssociationsMixin<Blog, number>
  declare hasEmpBlog: HasManyHasAssociationMixin<Blog, number>
  declare hasEmpBlogs: HasManyHasAssociationsMixin<Blog, number>
  declare countEmpBlogs: HasManyCountAssociationsMixin

  declare static associations: {
    empLikes: Association<Employee, UpVote>
    empComments: Association<Employee, Comment>
    empBlogs: Association<Employee, Blog>
  }

  static initModel(sequelize: Sequelize): typeof Employee {
    Employee.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        fullname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        dob: {
          type: DataTypes.DATE,
        },
        role: {
          type: DataTypes.STRING,
        },
        avatar: {
          type: DataTypes.STRING,
        },
        active: {
          type: DataTypes.BOOLEAN,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      },
    )

    return Employee
  }
}
