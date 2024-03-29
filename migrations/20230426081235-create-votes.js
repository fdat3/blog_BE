const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('votes', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                field: 'user_id'
            },
            employeeId: {
                type: DataTypes.INTEGER,
                field: 'employee_id'
            },
            blogId: {
                type: DataTypes.INTEGER,
                field: 'blog_id'
            },
            commentId: {
                type: DataTypes.INTEGER,
                field: 'comment_id'
            },
            typeVote: {
                type: DataTypes.ENUM('UP', 'DOWN'),
                field: 'type_vote'
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
        await queryInterface.dropTable('votes');
    },
};