
const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('up_votes', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
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
            blogId: {
                type: DataTypes.UUID,
                field: 'blog_id',
                defaultValue: DataTypes.UUIDV4
            },
            commentId: {
                type: DataTypes.UUID,
                field: 'comment_id',
                defaultValue: DataTypes.UUIDV4
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at'
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('up_votes');
    },
};