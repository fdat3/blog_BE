const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_activities', {
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
      action: {
        type: DataTypes.ENUM('JOIN_GROUP', 'LEAVE_GROUP', 'CHANGE_GROUP_SETTING', 'NEW_POLL', 'DELETE_POLL', 'INVITE_MEMBER_BY_ADMIN', 'REMOVE_MEMBER_BY_ADMIN', 'INVITE_MEMBER_BY_OWNER', 'REMOVE_MEMBER_BY_OWNER', 'USER_ACCEPT_INVITATION', 'USER_REJECT_INVITATION', 'MEMBER_BANNED'),
        field: 'action'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        defaultValue: DataTypes.UUIDV4
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
    await queryInterface.dropTable('group_activities');
  },
};