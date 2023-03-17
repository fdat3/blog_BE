const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('search_histories', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id'
      },
      value: {
        type: DataTypes.STRING,
        field: 'value'
      },
      count: {
        type: DataTypes.INTEGER,
        field: 'count'
      },
      deletedAt: {
        type: DataTypes.STRING,
        field: 'deleted_at'
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
    await queryInterface.dropTable('search_histories');
  },
};