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
    
    const getRandomMBTI = () => {
      const MBTI = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTI', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
      const randomIndex = Math.floor(Math.random() * MBTI.length);
      return MBTI[randomIndex];
    }
    
    
    const users = [...Array(100)].map(() => {
      
      return {
        id: faker.datatype.uuid(),
        fullname: faker.internet.userName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        dob: faker.date.birthdate(),
        password: faker.internet.password(),
        phone: faker.phone.number({format: '###########'}),
        invite_code: faker.datatype.string(5).toUpperCase(),
        gender: faker.name.sexType(),
        mbti: getRandomMBTI(),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })
    
    await queryInterface.bulkInsert('users', users, {});
    
    const userSettings = users.map((user) => ({
      id: faker.datatype.uuid(),
      user_id: user.id,
      setting_1: faker.datatype.boolean(),
      setting_2: faker.datatype.boolean(),
      created_at: new Date(),
      updated_at: new Date(),
    }))
    await queryInterface.bulkInsert('user_settings', userSettings, {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('user_settings', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
