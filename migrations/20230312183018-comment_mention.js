const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comment_mentions', {
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
      mentionedId: {
        type: DataTypes.UUID,
        field: 'mentioned_id'
      },
      pollCommentId: {
        type: DataTypes.UUID,
        field: 'poll_comment_id'
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
    await queryInterface.dropTable('comment_mentions');
  },
};