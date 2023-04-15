const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('group_member_requests', {
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
      inviterId: {
        type: DataTypes.UUID,
        field: 'inviter_id'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      },
      acceptedAt: {
        type: DataTypes.DATE,
        field: 'accepted_at'
      },
      rejectedAt: {
        type: DataTypes.DATE,
        field: 'rejected_at'
      },
      groupId: {
        type: DataTypes.UUID,
        field: 'group_id'
      },
      status: {
        type: DataTypes.ENUM('WAITING_APPROVE', 'APPROVED', 'REJECTED'),
        field: 'status'
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
    await queryInterface.dropTable('group_member_requests');
  },
};