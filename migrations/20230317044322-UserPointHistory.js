const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_point_histories', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userPointId: {
        type: DataTypes.UUID,
        field: 'user_point_id'
      },
      point: {
        type: DataTypes.INTEGER,
        field: 'point'
      },
      type: {
        type: DataTypes.ENUM('WITHDRAW', 'GAME', 'DAILY_ATTENDANCE'),
        field: 'type'
      },
      deletedAt: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('user_point_histories');
  },
};