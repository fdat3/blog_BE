const DataTypes = require('sequelize').DataTypes

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('blogs', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'blogs_user_id_fkey',
            references: {
                table: 'users',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('up_votes', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'up_votes_user_id_fkey',
            references: {
                table: 'users',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('up_votes', {
            fields: ['blog_id'],
            type: 'foreign key',
            name: 'up_votes_blog_id_fkey',
            references: {
                table: 'blogs',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('up_votes', {
            fields: ['comment_id'],
            type: 'foreign key',
            name: 'up_votes_comment_id_fkey',
            references: {
                table: 'comments',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('comments', {
            fields: ['blog_id'],
            type: 'foreign key',
            name: 'comments_blog_id_fkey',
            references: {
                table: 'blogs',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('comments', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'comments_user_id_fkey',
            references: {
                table: 'users',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('banners', {
            fields: ['id'],
            type: 'foreign key',
            name: 'banners_id_fkey',
            references: {
                table: 'settings',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('banners', {
            fields: ['banner_id'],
            type: 'foreign key',
            name: 'banners_banner_id_fkey',
            references: {
                table: 'settings',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('themes', {
            fields: ['id'],
            type: 'foreign key',
            name: 'themes_id_fkey',
            references: {
                table: 'settings',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('themes', {
            fields: ['theme_id'],
            type: 'foreign key',
            name: 'themes_theme_id_fkey',
            references: {
                table: 'settings',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('down_votes', {
            fields: ['blog_id'],
            type: 'foreign key',
            name: 'down_votes_blog_id_fkey',
            references: {
                table: 'blogs',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('down_votes', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'down_votes_user_id_fkey',
            references: {
                table: 'users',
                field: 'id'
            }
        })

        await queryInterface.addConstraint('down_votes', {
            fields: ['comment_id'],
            type: 'foreign key',
            name: 'down_votes_comment_id_fkey',
            references: {
                table: 'comments',
                field: 'id'
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('blogs', 'blogs_user_id_fkey')
        await queryInterface.removeConstraint('up_votes', 'up_votes_user_id_fkey')
        await queryInterface.removeConstraint('up_votes', 'up_votes_blog_id_fkey')
        await queryInterface.removeConstraint('up_votes', 'up_votes_comment_id_fkey')
        await queryInterface.removeConstraint('comments', 'comments_blog_id_fkey')
        await queryInterface.removeConstraint('comments', 'comments_user_id_fkey')
        await queryInterface.removeConstraint('banners', 'banners_id_fkey')
        await queryInterface.removeConstraint('banners', 'banners_banner_id_fkey')
        await queryInterface.removeConstraint('themes', 'themes_id_fkey')
        await queryInterface.removeConstraint('themes', 'themes_theme_id_fkey')
        await queryInterface.removeConstraint('down_votes', 'down_votes_blog_id_fkey')
        await queryInterface.removeConstraint('down_votes', 'down_votes_user_id_fkey')
        await queryInterface.removeConstraint('down_votes', 'down_votes_comment_id_fkey')
    }
};