const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('blogs', {
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
            title: {
                type: DataTypes.TEXT,
                field: 'title'
            },
            hashtag: {
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