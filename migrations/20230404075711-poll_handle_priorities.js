const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poll_handle_priorities', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      pollId: {
        type: DataTypes.UUID,
        field: 'poll_id'
      },
      startDate: {
        type: DataTypes.DATEONLY,
        field: 'start_date'
      },
      endDate: {
        type: DataTypes.DATEONLY,
        field: 'end_date'
      },
      isViewUpdatedByAdmin: {
        type: DataTypes.BOOLEAN,
        field: 'is_view_updated_by_admin'
      },
      adminUpdateView: {
        type: DataTypes.BIGINT,
        field: 'admin_update_view'
      },
      transactionId: {
        type: DataTypes.UUID,
        field: 'transaction_id'
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
    await queryInterface.dropTable('poll_handle_priorities');
  },
};