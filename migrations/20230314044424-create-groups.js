const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groups', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(200),
        field: 'name'
      },
      password: {
        type: DataTypes.TEXT,
        field: 'password'
      },
      isVisible: {
        type: DataTypes.BOOLEAN,
        field: 'is_visible',
        defaultValue: true
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        field: 'is_private',
        defaultValue: true
      },
      ownerId: {
        type: DataTypes.UUID,
        field: 'owner_id'
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
    await queryInterface.dropTable('groups');
  },
};