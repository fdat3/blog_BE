const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contact_lists', {
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
      contactId: {
        type: DataTypes.UUID,
        field: 'contact_id'
      },
      phone: {
        type: DataTypes.STRING(20),
        field: 'phone'
      },
      name: {
        type: DataTypes.STRING,
        field: 'name'
      },
      isSync: {
        type: DataTypes.BOOLEAN,
        field: 'is_sync',
        defaultValue: false
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
    await queryInterface.dropTable('contact_lists');
  },
};