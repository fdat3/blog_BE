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
    await queryInterface.addConstraint('poll_up_package_user_boughts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_up_package_user_boughts_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_up_package_user_boughts', {
      fields: ['package_id'],
      type: 'foreign key',
      name: 'poll_up_package_user_boughts_package_id_fkey',
      references: {
        table: 'poll_up_packages',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_up_package_user_boughts', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'poll_up_package_user_boughts_poll_id_fkey',
      references: {
        table: 'polls',
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
    await queryInterface.removeConstraint('poll_up_package_user_boughts', 'poll_up_package_user_boughts_user_id_fkey')
    await queryInterface.removeConstraint('poll_up_package_user_boughts', 'poll_up_package_user_boughts_package_id_fkey')
    await queryInterface.removeConstraint('poll_up_package_user_boughts', 'poll_up_package_user_boughts_poll_id_fkey')
  }
};
