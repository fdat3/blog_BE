import { TPollVoteActionType } from '../types/poll.type'

export interface PollVoteBodyInterface {
  action: TPollVoteActionType
  pollAnswerId: uuid
}

export interface PollVoteInterface extends PollVoteBodyInterface {
  pollId: uuid
  userId: uuid
}

export interface PollVoteRepositoryInterface
  extends Omit<PollVoteBodyInterface, 'action'> {}
