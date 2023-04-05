import { faker } from '@faker-js/faker';

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
    const pollup_packages = [Array(5)].map((_, i) => ({
      id: faker.datatype.uuid(),
      name: `pollup_package_${i + 1}`,
      description: `pollup_package_${i + 1}`,
      amount: 1000 * (i + 1),
      created_at: new Date(),
      updated_at: new Date(),
    }));
    
    await queryInterface.bulkInsert('poll_up_packages', pollup_packages, {});
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
