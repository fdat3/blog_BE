const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_link_sns', {
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
      loginType: {
        type: DataTypes.ENUM('FACEBOOK', 'GOOGLE', 'KAKAO', 'NAVER', 'APPLE', 'NORMAL'),
        field: 'login_type'
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
    await queryInterface.dropTable('user_link_sns');
  },
};