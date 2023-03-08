const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poll_comment', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      pollId: {
        type: DataTypes.UUID,
        field: 'poll_id',
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      content: {
        type: DataTypes.TEXT,
        field: 'content'
      },
      image: {
        type: DataTypes.STRING(255),
        field: 'image'
      },
      hashtag: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'hashtag'
      },
      parentId: {
        type: DataTypes.UUID,
        field: 'parent_id',
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
    await queryInterface.dropTable('poll_comment');
  },
};