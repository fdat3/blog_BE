const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('polls', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'polls_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('polls', {
      fields: ['category_id'],
      type: 'foreign key',s\
      name: 'polls_category_id_fkey',
      references: {
        table: 'poll_categories',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('polls', {
      fields: ['poll_category_id'],
      type: 'foreign key',
      name: 'polls_poll_category_id_fkey',
      references: {
        table: 'poll_categories',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_answers', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'poll_answers_poll_id_fkey',
      references: {
        table: 'polls',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_answer_chosens', {
      fields: ['poll_answer_id'],
      type: 'foreign key',
      name: 'poll_answer_chosens_poll_answer_id_fkey',
      references: {
        table: 'poll_answers',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_answer_chosens', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_answer_chosens_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })

    
    await queryInterface.addConstraint('poll_comments', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'poll_comments_poll_id_fkey',
      references: {
        table: 'polls',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_comments', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_comments_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_comments', {
      fields: ['parent_id'],
      type: 'foreign key',
      name: 'poll_comments_parent_id_fkey',
      references: {
        table: 'poll_comments',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('user_devices', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_devices_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('blocks', {
      fields: ['blocker_id'],
      type: 'foreign key',
      name: 'blocks_blocker_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('blocks', {
      fields: ['blocked_id'],
      type: 'foreign key',
      name: 'blocks_blocked_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('report_users', {
      fields: ['reporter_id'],
      type: 'foreign key',
      name: 'report_users_reporter_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('report_users', {
      fields: ['reported_id'],
      type: 'foreign key',
      name: 'report_users_reported_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('report_polls', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'report_polls_poll_id_fkey',
      references: {
        table: 'polls',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('report_polls', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'report_polls_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
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
        table: 'hashtags',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_mentions', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'poll_mentions_poll_id_fkey',
      references: {
        table: 'polls',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_mentions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_mentions_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_comment_mentions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'poll_comment_mentions_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_comment_mentions', {
      fields: ['mentioned_id'],
      type: 'foreign key',
      name: 'poll_comment_mentions_mentioned_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_comment_mentions', {
      fields: ['poll_comment_id'],
      type: 'foreign key',
      name: 'poll_comment_mentions_poll_comment_id_fkey',
      references: {
        table: 'poll_comments',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_comment_hashtags', {
      fields: ['poll_comment_id'],
      type: 'foreign key',
      name: 'poll_comment_hashtags_poll_comment_id_fkey',
      references: {
        table: 'poll_comments',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('poll_comment_hashtags', {
      fields: ['hashtag_id'],
      type: 'foreign key',
      name: 'poll_comment_hashtags_hashtag_id_fkey',
      references: {
        table: 'hashtags',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('sessions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'sessions_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('likes', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'likes_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('likes', {
      fields: ['poll_id'],
      type: 'foreign key',
      name: 'likes_poll_id_fkey',
      references: {
        table: 'polls',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('likes', {
      fields: ['poll_comment_id'],
      type: 'foreign key',
      name: 'likes_poll_comment_id_fkey',
      references: {
        table: 'poll_comments',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('groups', {
      fields: ['owner_id'],
      type: 'foreign key',
      name: 'groups_owner_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('group_members', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'group_members_group_id_fkey',
      references: {
        table: 'groups',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('group_members', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'group_members_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('group_member_settings', {
      fields: ['group_member_id'],
      type: 'foreign key',
      name: 'group_member_settings_group_member_id_fkey',
      references: {
        table: 'group_members',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('group_settings', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'group_settings_group_id_fkey',
      references: {
        table: 'groups',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('user_settings', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_settings_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('polls', 'polls_user_id_fkey')
    await queryInterface.removeConstraint('polls', 'polls_category_id_fkey')
    await queryInterface.removeConstraint('polls', 'polls_poll_category_id_fkey')
    await queryInterface.removeConstraint('poll_answers', 'poll_answers_poll_id_fkey')
    await queryInterface.removeConstraint('poll_answer_chosens', 'poll_answer_chosens_poll_answer_id_fkey')
    await queryInterface.removeConstraint('poll_answer_chosens', 'poll_answer_chosens_user_id_fkey')
    await queryInterface.removeConstraint('poll_answer_chosens', 'poll_answer_chosens_poll_anwser_id_fkey')
    await queryInterface.removeConstraint('poll_comments', 'poll_comments_poll_id_fkey')
    await queryInterface.removeConstraint('poll_comments', 'poll_comments_user_id_fkey')
    await queryInterface.removeConstraint('poll_comments', 'poll_comments_parent_id_fkey')
    await queryInterface.removeConstraint('user_devices', 'user_devices_user_id_fkey')
    await queryInterface.removeConstraint('blocks', 'blocks_blocker_id_fkey')
    await queryInterface.removeConstraint('blocks', 'blocks_blocked_id_fkey')
    await queryInterface.removeConstraint('report_users', 'report_users_reporter_id_fkey')
    await queryInterface.removeConstraint('report_users', 'report_users_reported_id_fkey')
    await queryInterface.removeConstraint('report_polls', 'report_polls_poll_id_fkey')
    await queryInterface.removeConstraint('report_polls', 'report_polls_user_id_fkey')
    await queryInterface.removeConstraint('poll_hashtags', 'poll_hashtags_poll_id_fkey')
    await queryInterface.removeConstraint('poll_hashtags', 'poll_hashtags_hashtag_id_fkey')
    await queryInterface.removeConstraint('poll_mentions', 'poll_mentions_poll_id_fkey')
    await queryInterface.removeConstraint('poll_mentions', 'poll_mentions_user_id_fkey')
    await queryInterface.removeConstraint('poll_comment_mentions', 'poll_comment_mentions_user_id_fkey')
    await queryInterface.removeConstraint('poll_comment_mentions', 'poll_comment_mentions_mentioned_id_fkey')
    await queryInterface.removeConstraint('poll_comment_mentions', 'poll_comment_mentions_poll_comment_id_fkey')
    await queryInterface.removeConstraint('poll_comment_hashtags', 'poll_comment_hashtags_poll_comment_id_fkey')
    await queryInterface.removeConstraint('poll_comment_hashtags', 'poll_comment_hashtags_hashtag_id_fkey')
    await queryInterface.removeConstraint('sessions', 'sessions_user_id_fkey')
    await queryInterface.removeConstraint('likes', 'likes_user_id_fkey')
    await queryInterface.removeConstraint('likes', 'likes_poll_id_fkey')
    await queryInterface.removeConstraint('likes', 'likes_poll_comment_id_fkey')
    await queryInterface.removeConstraint('groups', 'groups_owner_id_fkey')
    await queryInterface.removeConstraint('group_members', 'group_members_group_id_fkey')
    await queryInterface.removeConstraint('group_members', 'group_members_user_id_fkey')
    await queryInterface.removeConstraint('group_member_settings', 'group_member_settings_group_member_id_fkey')
    await queryInterface.removeConstraint('group_settings', 'group_settings_group_id_fkey')
    await queryInterface.removeConstraint('user_settings', 'user_settings_user_id_fkey')
  }
};