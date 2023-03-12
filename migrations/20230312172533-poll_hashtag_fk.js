'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('poll_hashtags', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'poll_hashtags_poll_id_fkey',
      references: {
        table: 'polls',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll_hashtags', {
      fields: ['hashtag_id'],
      type: 'foreign key',
      name: 'poll_hashtags_hashtag_id_fkey',
      references: {
        table: 'hash_tags',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('poll_hashtags', 'poll_hashtags_poll_id_fkey')
    await queryInterface.removeConstraint('poll_hashtags', 'poll_hashtags_hashtag_id_fkey')
  }
};