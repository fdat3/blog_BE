const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('polls', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      categoryId: {
        type: DataTypes.UUID,
        field: 'category_id',
      },
      title: {
        type: DataTypes.STRING(100),
        field: 'title'
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description'
      },
      image: {
        type: DataTypes.STRING(200),
        field: 'image'
      },
      canAddNewAnswer: {
        type: DataTypes.BOOLEAN,
        field: 'can_add_new_answer',
        defaultValue: true
      },
      anonymousPoll: {
        type: DataTypes.BOOLEAN,
        field: 'anonymous_poll',
        defaultValue: true
      },
      viewCount: {
        type: DataTypes.BIGINT,
        field: 'view_count'
      },
      type: {
        type: DataTypes.ENUM('TEXT', 'IMAGE', 'LOCATION', 'TRENDY_TALK'),
        field: 'type'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      pollCategoryId: {
        type: DataTypes.UUID,
        field: 'poll_category_id'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('polls');
  },
};