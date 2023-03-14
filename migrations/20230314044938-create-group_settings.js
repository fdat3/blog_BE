const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_settings', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      groupId: {
        type: DataTypes.UUID,
        field: 'group_id'
      },
      setting_1: {
        type: DataTypes.BOOLEAN,
        field: 'setting_1',
        defaultValue: true
      },
      setting_2: {
        type: DataTypes.BOOLEAN,
        field: 'setting_2',
        defaultValue: true
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
    await queryInterface.dropTable('group_settings');
  },
};