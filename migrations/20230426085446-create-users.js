const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            fullname: {
                type: DataTypes.STRING,
                field: 'fullname'
            },
            email: {
                type: DataTypes.STRING,
                field: 'email'
            },
            password: {
                type: DataTypes.STRING,
                field: 'password'
            },
            dob: {
                type: DataTypes.DATE,
                field: 'dob'
            },
            avatar: {
                type: DataTypes.STRING,
                field: 'avatar'
            },
            followerCount: {
                type: DataTypes.INTEGER,
                field: 'follower_count'
            },
            loginType: {
                type: DataTypes.ENUM('GOOGLE  FACEBOOK'),
                field: 'login_type'
            },
            active: {
                type: DataTypes.BOOLEAN,
                field: 'active'
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
        await queryInterface.dropTable('users');
    },
};