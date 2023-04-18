import { EPollVoteActionType } from '@/enums/pollVote.enum'
import { PollVoteInterface } from '@/interfaces/poll.interface'

export type TPollVoteActionType = keyof typeof EPollVoteActionType

export type TPollVoteRepository = Omit<PollVoteInterface, 'action'>
