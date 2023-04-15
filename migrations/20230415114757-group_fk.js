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
        table: 'packages',
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
    
    await queryInterface.addConstraint('group_activities', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'group_activities_group_id_fkey',
      references: {
        table: 'groups',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('group_activities', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'group_activities_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('group_member_requests', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'group_member_requests_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('group_member_requests', {
      fields: ['inviter_id'],
      type: 'foreign key',
      name: 'group_member_requests_inviter_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('group_member_requests', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'group_member_requests_group_id_fkey',
      references: {
        table: 'groups',
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
    await queryInterface.removeConstraint('group_activities', 'group_activities_group_id_fkey')
    await queryInterface.removeConstraint('group_activities', 'group_activities_user_id_fkey')
    await queryInterface.removeConstraint('group_member_requests', 'group_member_requests_user_id_fkey')
    await queryInterface.removeConstraint('group_member_requests', 'group_member_requests_inviter_id_fkey')
    await queryInterface.removeConstraint('group_member_requests', 'group_member_requests_group_id_fkey')
  }
};
