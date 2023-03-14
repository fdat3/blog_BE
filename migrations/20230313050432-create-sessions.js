const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sessions', {
      userId: {
        type: DataTypes.UUID,
        field: 'user_id'
      },
      sid: {
        type: DataTypes.STRING,
        field: 'sid',
        primaryKey: true
      },
      expires: {
        type: DataTypes.STRING,
        field: 'expires'
      },
      data: {
        type: DataTypes.TEXT,
        field: 'data'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sessions');
  },
};