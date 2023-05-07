import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import type { Blog } from './Blog'
import type { Comment } from './Comment'
import type { Employee } from './Employee'
import type { User } from './User'

type UpVoteAssociations = 'comment' | 'blogFkId' | 'empId' | 'userFkId'

export class UpVote extends Model<
  InferAttributes<UpVote, { omit: UpVoteAssociations }>,
  InferCreationAttributes<UpVote, { omit: UpVoteAssociations }>
> {
  declare id: CreationOptional<number>
  declare userId: number | null
  declare employeeId: number | null
  declare blogId: number | null
  declare commentId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // UpVote hasOne Comment
  declare comment?: NonAttribute<Comment>
  declare getComment: HasOneGetAssociationMixin<Comment>
  declare setComment: HasOneSetAssociationMixin<Comment, number>
  declare createComment: HasOneCreateAssociationMixin<Comment>

  // UpVote belongsTo Blog (as BlogFkId)
  declare blogFkId?: NonAttribute<Blog>
  declare getBlogFkId: BelongsToGetAssociationMixin<Blog>
  declare setBlogFkId: BelongsToSetAssociationMixin<Blog, number>
  declare createBlogFkId: BelongsToCreateAssociationMixin<Blog>

  // UpVote belongsTo Employee (as EmpId)
  declare empId?: NonAttribute<Employee>
  declare getEmpId: BelongsToGetAssociationMixin<Employee>
  declare setEmpId: BelongsToSetAssociationMixin<Employee, number>
  declare createEmpId: BelongsToCreateAssociationMixin<Employee>

  // UpVote belongsTo User (as UserFkId)
  declare userFkId?: NonAttribute<User>
  declare getUserFkId: BelongsToGetAssociationMixin<User>
  declare setUserFkId: BelongsToSetAssociationMixin<User, number>
  declare createUserFkId: BelongsToCreateAssociationMixin<User>

  declare static associations: {
    comment: Association<UpVote, Comment>
    blogFkId: Association<UpVote, Blog>
    empId: Association<UpVote, Employee>
    userFkId: Association<UpVote, User>
  }

  static initModel(sequelize: Sequelize): typeof UpVote {
    UpVote.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        employeeId: {
          type: DataTypes.INTEGER,
        },
        blogId: {
          type: DataTypes.INTEGER,
        },
        commentId: {
          type: DataTypes.INTEGER,
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

    return UpVote
  }
}
