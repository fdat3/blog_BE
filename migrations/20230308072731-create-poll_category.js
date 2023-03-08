const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poll_category', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      label: {
        type: DataTypes.STRING(100),
        field: 'label',
        unique: true
      },
      hashtag: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'hashtag'
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description'
      },
      image: {
        type: DataTypes.STRING(255),
        field: 'image'
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
    await queryInterface.dropTable('poll_category');
  },
};