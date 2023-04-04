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
    await queryInterface.addConstraint('poll_handle_priorities', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'poll_handle_priorities_poll_id_fkey',
      references: {
        table: 'polls',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll_handle_priorities', {
      fields: ['transaction_id'],
      type: 'foreign key',
      name: 'poll_handle_priorities_transaction_id_fkey',
      references: {
        table: 'transactions',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('transactions', {
      fields: ['package_id'],
      type: 'foreign key',
      name: 'transactions_package_id_fkey',
      references: {
        table: 'poll_up_packages',
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

    await queryInterface.removeConstraint('poll_handle_priorities', 'poll_handle_priorities_poll_id_fkey')
    await queryInterface.removeConstraint('poll_handle_priorities', 'poll_handle_priorities_transaction_id_fkey')
    await queryInterface.removeConstraint('transactions', 'transactions_package_id_fkey')
  }
};
