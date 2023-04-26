// import {
//     Association,
//     BelongsToGetAssociationMixin,
//     BelongsToSetAssociationMixin,
//     BelongsToCreateAssociationMixin,
//     CreationOptional,
//     DataTypes,
//     InferCreationAttributes,
//     InferAttributes,
//     Model,
//     NonAttribute,
//     Sequelize
// } from 'sequelize'
// import type { Blog } from './Blog'
// import type { Employee } from './Employee'
// import type { User } from './User'

// type CommentAssociations = 'blogId' | 'empId' | 'userId' | 'parentId'

// export class Comment extends Model<
//     InferAttributes<Comment, { omit: CommentAssociations }>,
//     InferCreationAttributes<Comment, { omit: CommentAssociations }>
// > {
//     declare id: CreationOptional<number>
//     declare blogId: string | null
//     declare userId: string | null
//     declare employeeId: string | null
//     declare parentId: string | null
//     declare content: string | null
//     declare image: string | null
//     declare createdAt: CreationOptional<Date>
//     declare updatedAt: CreationOptional<Date>

//     // Comment belongsTo Blog (as BlogId)
//     declare blogId?: NonAttribute<Blog>
//     declare getBlogId: BelongsToGetAssociationMixin<Blog>
//     declare setBlogId: BelongsToSetAssociationMixin<Blog, number>
//     declare createBlogId: BelongsToCreateAssociationMixin<Blog>

//     // Comment belongsTo Employee (as EmpId)
//     declare empId?: NonAttribute<Employee>
//     declare getEmpId: BelongsToGetAssociationMixin<Employee>
//     declare setEmpId: BelongsToSetAssociationMixin<Employee, number>
//     declare createEmpId: BelongsToCreateAssociationMixin<Employee>

//     // Comment belongsTo User (as UserId)
//     declare userId?: NonAttribute<User>
//     declare getUserId: BelongsToGetAssociationMixin<User>
//     declare setUserId: BelongsToSetAssociationMixin<User, number>
//     declare createUserId: BelongsToCreateAssociationMixin<User>

//     // Comment belongsTo Comment (as ParentId)
//     declare parentId?: NonAttribute<Comment>
//     declare getParentId: BelongsToGetAssociationMixin<Comment>
//     declare setParentId: BelongsToSetAssociationMixin<Comment, number>
//     declare createParentId: BelongsToCreateAssociationMixin<Comment>

//     declare static associations: {
//         blogId: Association<Comment, Blog>,
//         empId: Association<Comment, Employee>,
//         userId: Association<Comment, User>,
//         parentId: Association<Comment, Comment>
//     }

//     static initModel(sequelize: Sequelize): typeof Comment {
//         Comment.init({
//             id: {
//                 type: DataTypes.INTEGER.UNSIGNED,
//                 primaryKey: true,
//                 autoIncrement: true,
//                 allowNull: false
//             },
//             blogId: {
//                 type: DataTypes.UUID,
//                 defaultValue: DataTypes.UUIDV4
//             },
//             userId: {
//                 type: DataTypes.UUID,
//                 defaultValue: DataTypes.UUIDV4
//             },
//             employeeId: {
//                 type: DataTypes.UUID,
//                 defaultValue: DataTypes.UUIDV4
//             },
//             parentId: {
//                 type: DataTypes.UUID,
//                 defaultValue: DataTypes.UUIDV4
//             },
//             content: {
//                 type: DataTypes.TEXT
//             },
//             image: {
//                 type: DataTypes.STRING
//             },
//             createdAt: {
//                 type: DataTypes.DATE
//             },
//             updatedAt: {
//                 type: DataTypes.DATE
//             }
//         }, {
//             sequelize
//         })

//         return Comment
//     }
// }
