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
      view_count: faker.datatype.number({
        'min': 0,
        'max': 1000
      }),
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

      const comemnts = [...Array(faker.datatype.number({
        'min': 1,
        'max': 10
      }))].map(() => ({
        id: faker.datatype.uuid(),
        poll_id: poll.id,
        content: faker.lorem.sentence(),
        created_at: date,
        updated_at: date,
      }))

      await queryInterface.bulkInsert('poll_comments', comemnts, {});
    }
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('polls', {}, {});
    await queryInterface.bulkDelete('poll_answers', {}, {})
    await queryInterface.bulkDelete('poll_comments', {}, {})
  },
}