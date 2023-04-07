const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('priority_poll_by_dates', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      pollIds: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'poll_ids'
      },
      type: {
        type: DataTypes.ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'POPULARITY'),
        defaultValue: 'POPULARITY'
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
    await queryInterface.dropTable('priority_poll_by_dates');
  },
};