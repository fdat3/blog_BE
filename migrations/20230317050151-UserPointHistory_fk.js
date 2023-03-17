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
    await queryInterface.addConstraint('user_point_histories', {
      fields: ['user_point_id'],
      type: 'foreign key',
      name: 'user_point_histories_user_point_id_fkey',
      references: {
        table: 'user_points',
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
    await queryInterface.removeConstraint('user_point_histories', 'user_point_histories_user_point_id_fkey')
  }
};