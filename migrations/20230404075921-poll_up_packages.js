const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poll_up_packages', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      amount: {
        type: DataTypes.BIGINT,
        field: 'amount'
      },
      type: {
        type: DataTypes.ENUM('PG', 'APPLE_PAY', 'GOOGLE_PAY'),
        field: 'type'
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
    await queryInterface.dropTable('poll_up_packages');
  },
};