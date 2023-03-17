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
    await queryInterface.addConstraint('contact_lists', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'contact_lists_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('contact_lists', {
      fields: ['contact_id'],
      type: 'foreign key',
      name: 'contact_lists_contact_id_fkey',
      references: {
        table: 'users',
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
    await queryInterface.removeConstraint('contact_lists', 'contact_lists_user_id_fkey')
    await queryInterface.removeConstraint('contact_lists', 'contact_lists_contact_id_fkey')
  }
};