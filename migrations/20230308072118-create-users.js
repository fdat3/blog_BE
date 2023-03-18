const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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
      },
      password: {
        type: DataTypes.STRING(255),
        field: 'password',
        allowNull: true
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
      mbti: {
        type: DataTypes.ENUM('INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTI', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'),
        field: 'mbti'
      },
      identify: {
        type: DataTypes.STRING(100),
        field: 'identify'
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        field: 'is_admin',
        defaultValue: false
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
    await queryInterface.dropTable('users');
  },
};