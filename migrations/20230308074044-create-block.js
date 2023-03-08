const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('block', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      blockerId: {
        type: DataTypes.UUID,
        field: 'blocker_id',
      },
      blockedId: {
        type: DataTypes.UUID,
        field: 'blocked_id'
      },
      reason: {
        type: DataTypes.TEXT,
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
    await queryInterface.dropTable('block');
  },
};