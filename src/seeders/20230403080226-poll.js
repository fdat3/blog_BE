import { faker } from '@faker-js/faker';
import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface) => {
    const date = new Date()
    const polls = [...Array(100)].map(() => ({
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      image: faker.image.abstract(1234, 2345, true),
      created_at: date,
      updated_at: date,
    }))

    await queryInterface.bulkInsert('polls', polls, {});

    for (const poll of polls) {
      const answers = [...Array(5)].map(() => ({
        id: faker.datatype.uuid(),
        poll_id: poll.id,
        content: faker.lorem.sentence(),
        created_at: date,
        updated_at: date,
      }))

      await queryInterface.bulkInsert('poll_answers', answers, {});
    }
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('polls', {}, {});
    await queryInterface.bulkDelete('poll_answers', {}, {})
  },
}