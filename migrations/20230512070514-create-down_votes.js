const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('down_votes', {
            id: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true
            },
            blogId: {
                type: DataTypes.INTEGER,
                field: 'blog_id'
            },
            userId: {
                type: DataTypes.INTEGER,
                field: 'user_id'
            },
            commentId: {
                type: DataTypes.INTEGER,
                field: 'comment_id'
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
        await queryInterface.dropTable('down_votes');
    },
};