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
    await queryInterface.addConstraint('follows', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'follows_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('follows', {
      fields: ['followed_id'],
      type: 'foreign key',
      name: 'follows_followed_id_fkey',
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
    await queryInterface.removeConstraint('follows', 'follows_user_id_fkey')
    await queryInterface.removeConstraint('follows', 'follows_followed_id_fkey')
  }
};