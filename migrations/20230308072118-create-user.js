const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      fullname: {
        type: DataTypes.STRING(100),
        field: 'fullname',
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        field: 'email',
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        field: 'password',
        allowNull: false
      },
      dob: {
        type: DataTypes.DATE,
        field: 'dob'
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING(15),
        field: 'phone',
        unique: true
      },
      inviteCode: {
        type: DataTypes.STRING(20),
        field: 'invite_code',
        unique: true
      },
      refCode: {
        type: DataTypes.STRING(20),
        field: 'ref_code',
        unique: true
      },
      gender: {
        type: DataTypes.STRING(10),
        field: 'gender'
      },
      instagram: {
        type: DataTypes.STRING(100),
        field: 'instagram'
      },
      mbtiId: {
        type: DataTypes.UUID,
        field: 'mbti_id',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: DataTypes.NOW
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  },
};