const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.BIGINT,
                field: 'user_id',
            },
            employeeId: {
                type: DataTypes.BIGINT,
                field: 'employee_id',
            },
            title: {
                type: DataTypes.TEXT,
                field: 'title'
            },
            subTitle: {
                type: DataTypes.TEXT,
                field: 'sub_title'
            },
            slug: {
                type: DataTypes.STRING,
                field: 'slug'
            },
            meta: {
                type: DataTypes.STRING,
                field: 'meta'
            },
            body: {
                type: DataTypes.TEXT,
                field: 'body'
            },
            upVote: {
                type: DataTypes.INTEGER,
                field: 'up_vote'
            },
            downVote: {
                type: DataTypes.INTEGER,
                field: 'down_vote'
            },
            averageVote: {
                type: DataTypes.FLOAT,
                field: 'average_vote'
            },
            readCount: {
                type: DataTypes.INTEGER,
                field: 'read_count'
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
        await queryInterface.dropTable('blogs');
    },
};