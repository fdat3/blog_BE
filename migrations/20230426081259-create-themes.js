const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('themes', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                field: 'title'
            },
            setting: {
                type: DataTypes.JSONB,
                field: 'setting'
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at'
            },
            themeId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'theme_id'
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('themes');
    },
};