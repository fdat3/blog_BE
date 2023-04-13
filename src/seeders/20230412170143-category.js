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
    const categories = [...Array(10)].map(() => {
      return {
        id: faker.datatype.uuid(),
        label: faker.lorem.words(2),
        hashtag: [faker.lorem.word(), faker.lorem.word()],
        description: faker.lorem.lines(1),
        image: faker.image.imageUrl(),
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await queryInterface.bulkInsert('poll_categories', categories, {})
      
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('poll_categories', null, {})
  }
};
