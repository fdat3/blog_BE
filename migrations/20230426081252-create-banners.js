const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('banners', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM('MAIN  ORDER'),
                field: 'type'
            },
            imageList: {
                type: DataTypes.STRING,
                field: 'image_list'
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at'
            },
            bannerId: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'banner_id'
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('banners');
    },
};