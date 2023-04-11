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
    const createPollUpArray = (defineArray = []) => {
      if (!defineArray.length) return [];
      return defineArray.map((item) => {
        return {
          id: faker.datatype.uuid(),
          name: item[0],
          amount: item[1],
          description: faker.lorem.lines(1),
          created_at: new Date(),
          updated_at: new Date()
        }
      })
    }

    const pollUpArray = [['Poll up 10', 1000], ['poll up 20', 1900], ['Poll up 50', 4500], ['Poll up 100', 8500], ['Poll up unlimited', 12900]]

    await queryInterface.bulkInsert('poll_up_packages', createPollUpArray(pollUpArray), {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('poll_up_packages', null, {});
  }
};