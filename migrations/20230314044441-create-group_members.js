const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_members', {
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
      userId: {
        type: DataTypes.UUID,
        field: 'user_id'
      },
      role: {
        type: DataTypes.ENUM('OWNER', 'MEMBER'),
        field: 'role'
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
    await queryInterface.dropTable('group_members');
  },
};