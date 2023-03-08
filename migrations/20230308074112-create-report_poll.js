const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('report_poll', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      pollId: {
        type: DataTypes.UUID,
        field: 'poll_id'
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id'
      },
      reason: {
        type: DataTypes.STRING,
        field: 'reason'
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
    await queryInterface.dropTable('report_poll');
  },
};