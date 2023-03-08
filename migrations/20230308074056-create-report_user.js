const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('report_user', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      reporterId: {
        type: DataTypes.UUID,
        field: 'reporter_id'
      },
      reportedId: {
        type: DataTypes.UUID,
        field: 'reported_id'
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
    await queryInterface.dropTable('report_user');
  },
};