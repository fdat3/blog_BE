import { Poll } from '../models/pg'

describe('PollRepository', () => {
  it('should return polls', async () => {
    const polls = await Poll.findAll()
    expect(polls).toHaveLength(2)
  })
})
