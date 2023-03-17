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
    await queryInterface.addConstraint('recommended_category_lists', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'recommended_category_lists_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('recommended_category_lists', {
      fields: ['poll_category_id'],
      type: 'foreign key',
      name: 'recommended_category_lists_poll_category_id_fkey',
      references: {
        table: 'poll_categories',
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
    await queryInterface.removeConstraint('recommended_category_lists', 'recommended_category_lists_user_id_fkey')
    await queryInterface.removeConstraint('recommended_category_lists', 'recommended_category_lists_poll_category_id_fkey')
  }
};