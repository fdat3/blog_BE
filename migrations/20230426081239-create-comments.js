
const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('comments', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            blogId: {
                type: DataTypes.UUID,
                field: 'blog_id',
                defaultValue: DataTypes.UUIDV4
            },
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
                defaultValue: DataTypes.UUIDV4
            },
            employeeId: {
                type: DataTypes.UUID,
                field: 'employee_id',
                defaultValue: DataTypes.UUIDV4
            },
            parentId: {
                type: DataTypes.UUID,
                field: 'parent_id',
                defaultValue: DataTypes.UUIDV4
            },
            content: {
                type: DataTypes.TEXT,
                field: 'content'
            },
            image: {
                type: DataTypes.STRING,
                field: 'image'
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at'
            },
            commentId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'comment_id'
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('comments');
    },
};