'use strict';
const { faker } = require('@faker-js/faker')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    // Get some users
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "users";'
    );

    // create some group
    const groups = [...Array(10)].map(() => {
      const owner_id = users[0][faker.datatype.number({min: 0, max: users[0].length - 1})].id
      return {
        id: faker.datatype.uuid(),
        name: faker.lorem.words(2),
        owner_id,
        avatar: faker.image.avatar(),
        is_private: faker.datatype.boolean(),
        is_visible: faker.datatype.boolean(),
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    const groupOwner = groups.map(group => {
      return {
        id: faker.datatype.uuid(),
        group_id: group.id,
        user_id: group.owner_id,
        role: 'OWNER',
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    const groupOwnerActivity = groupOwner.map(group => {
      return {
        id: faker.datatype.uuid(),
        group_id: group.group_id,
        user_id: group.user_id,
        action: 'CREATE_GROUP',
        created_at: new Date(),
        updated_at: new Date()
      }
    })


    // Create group member
    const groupMembers = groups.map(group => {
      const user_id = users[0][faker.datatype.number({ min: 0, max: users[0].length - 1 })].id
      return {
        id: faker.datatype.uuid(),
        group_id: group.id,
        user_id,
        role: 'MEMBER',
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    const groupMemberActivity = groupMembers.map(group => {
      return {
        id: faker.datatype.uuid(),
        group_id: group.group_id,
        user_id: group.user_id,
        action: 'JOIN_GROUP',
        created_at: new Date(),
        updated_at: new Date()
      }
    })


    await queryInterface.bulkInsert('groups', groups, {})
    await queryInterface.bulkInsert('group_members', [...groupOwner, ...groupMembers], {})
    await queryInterface.bulkInsert('group_activities', [...groupOwnerActivity, ...groupMemberActivity], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('groups', null, {})
    await queryInterface.bulkDelete('group_members', null, {})
    await queryInterface.bulkDelete('group_activities', null, {})
  }
};
