const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poll_up_package_user_boughts', {
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
      packageId: {
        type: DataTypes.UUID,
        field: 'package_id',
      },
      point: {
        type: DataTypes.INTEGER,
        field: 'point'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      },
      isUsed: {
        type: DataTypes.BOOLEAN,
        field: 'is_used'
      },
      usedAt: {
        type: DataTypes.DATE,
        field: 'used_at'
      },
      pollId: {
        type: DataTypes.UUID,
        field: 'poll_id'
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
    await queryInterface.dropTable('poll_up_package_user_boughts');
  },
};