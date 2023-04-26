const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('employees', {
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
            role: {
                type: DataTypes.STRING,
                field: 'role'
            },
            avatar: {
                type: DataTypes.STRING,
                field: 'avatar'
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
        await queryInterface.dropTable('employees');
    },
};