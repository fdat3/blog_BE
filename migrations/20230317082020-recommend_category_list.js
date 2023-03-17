const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recommended_category_lists', {
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
      pollCategoryId: {
        type: DataTypes.UUID,
        field: 'poll_category_id'
      },
      clickCount: {
        type: DataTypes.INTEGER,
        field: 'click_count',
        defaultValue: 1
      },
      deletedAt: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('recommended_category_lists');
  },
};