const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poll_entities', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      offset: {
        type: DataTypes.INTEGER,
        field: 'offset'
      },
      length: {
        type: DataTypes.INTEGER,
        field: 'length'
      },
      type: {
        type: DataTypes.ENUM('MENTION', 'HASHTAG'),
        field: 'type'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      },
      pollId: {
        type: DataTypes.UUID,
        field: 'poll_id'
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
    await queryInterface.dropTable('poll_entities');
  },
};