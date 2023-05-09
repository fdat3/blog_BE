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
                type: DataTypes.INTEGER,
                field: 'blog_id'
            },
            userId: {
                type: DataTypes.INTEGER,
                field: 'user_id'
            },
            employeeId: {
                type: DataTypes.INTEGER,
                field: 'employee_id'
            },
            parentId: {
                type: DataTypes.INTEGER,
                field: 'parent_id'
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
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('comments');
    },
};