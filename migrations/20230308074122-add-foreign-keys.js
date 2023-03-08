const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addConstraint('poll', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_user_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'poll_category_id_fkey',
      references: {
        table: 'poll_category',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll_answer', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'poll_answer_poll_id_fkey',
      references: {
        table: 'poll',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll_answer', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_answer_user_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll_answer_chosen', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_answer_chosen_user_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_answer_chosen', {
      fields: ['poll_answer_id'],
      type: 'foreign key',
      name: 'poll_answer_chosen_poll_anwser_id_fkey',
      references: {
        table: 'poll_answer',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll_comment', {
      fields: ['id'],
      type: 'foreign key',
      name: 'poll_comment_id_fkey',
      references: {
        table: 'poll_comment',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll_comment', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'poll_comment_poll_id_fkey',
      references: {
        table: 'poll',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('poll_comment', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_comment_user_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('user', {
      fields: ['mbti_id'],
      type: 'foreign key',
      name: 'user_mbti_id_fkey',
      references: {
        table: 'mbti',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('user_device', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_device_user_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('block', {
      fields: ['blocker_id'],
      type: 'foreign key',
      name: 'block_blocker_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('block', {
      fields: ['blocked_id'],
      type: 'foreign key',
      name: 'block_blocked_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('report_user', {
      fields: ['reporter_id'],
      type: 'foreign key',
      name: 'report_user_reporter_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('report_poll', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'report_poll_poll_id_fkey',
      references: {
        table: 'poll',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('report_poll', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'report_poll_user_id_fkey',
      references: {
        table: 'user',
        field: 'id'
      }
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('user', 'user_blocked_id_fkey')
    await queryInterface.removeConstraint('user', 'user_reported_id_fkey')
    await queryInterface.removeConstraint('poll', 'poll_user_id_fkey')
    await queryInterface.removeConstraint('poll', 'poll_category_id_fkey')
    await queryInterface.removeConstraint('poll', 'poll_poll_id_fkey')
    await queryInterface.removeConstraint('poll_answer', 'poll_answer_poll_id_fkey')
    await queryInterface.removeConstraint('poll_answer', 'poll_answer_user_id_fkey')
    await queryInterface.removeConstraint('poll_answer_chosen', 'poll_answer_chosen_poll_answer_id_fkey')
    await queryInterface.removeConstraint('poll_answer_chosen', 'poll_answer_chosen_user_id_fkey')
    await queryInterface.removeConstraint('poll_answer_chosen', 'poll_answer_chosen_poll_anwser_id_fkey')
    await queryInterface.removeConstraint('poll_comment', 'poll_comment_id_fkey')
    await queryInterface.removeConstraint('poll_comment', 'poll_comment_poll_id_fkey')
    await queryInterface.removeConstraint('poll_comment', 'poll_comment_user_id_fkey')
    await queryInterface.removeConstraint('mbti', 'mbti_mbti_id_fkey')
    await queryInterface.removeConstraint('user_device', 'user_device_user_id_fkey')
    await queryInterface.removeConstraint('block', 'block_blocker_id_fkey')
    await queryInterface.removeConstraint('block', 'block_blocked_id_fkey')
    await queryInterface.removeConstraint('report_user', 'report_user_reporter_id_fkey')
    await queryInterface.removeConstraint('report_poll', 'report_poll_poll_id_fkey')
    await queryInterface.removeConstraint('report_poll', 'report_poll_user_id_fkey')
  }
};