const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_devices', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      fcmToken: {
        type: DataTypes.STRING(255),
        field: 'fcm_token'
      },
      deviceId: {
        type: DataTypes.STRING(255),
        field: 'device_id'
      },
      lastSession: {
        type: DataTypes.DATE,
        field: 'last_session',
        defaultValue: DataTypes.NOW
      },
      loginType: {
        type: DataTypes.STRING,
        field: 'login_type'
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
    await queryInterface.dropTable('user_devices');
  },
};