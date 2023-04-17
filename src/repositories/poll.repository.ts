import { sequelize } from '@/config/sql.config'
import baseController from '@/controllers/base.controller'

import { ICrudOption } from '@/interfaces/controller.interface'
import {
  Group,
  GroupMember,
  Poll,
  PollMention,
  PriorityPollByDate,
} from '@/models/pg'
import { Poll as PollType } from '@/models/pg'
import logger from '@/utils/logger.util'
import { redis } from '@/config/redis.config'
import { GetListRepository } from '@/interfaces/base.interface'
import TelegramUtil from '@/utils/telegram.util'
import NumberUtils from '@/utils/number.utils'
import RedisConstant from '@/constants/redis.constant'
import * as _ from 'lodash'
import PollConstant from '@/constants/poll.constant'
import PollVotesRepository from './poll_votes.repository'
import PollCommentRepository from './poll_comment.repository'
import Message from '@/constants/message.constant'

class PollRepository {
  private model

  constructor() {
    this.model = Poll
  }

  private cloneQueryInfoWithFilter(
    queryInfo: ICrudOption = {},
    filter: any = {},
  ): ICrudOption {
    const extendedQueryInfo = _.cloneDeep(queryInfo) || {}
    if (extendedQueryInfo?.filter) {
      extendedQueryInfo.filter = {
        ...extendedQueryInfo.filter,
        ...filter,
      }
    } else {
      extendedQueryInfo.filter = filter
    }

    return extendedQueryInfo
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Poll> | null> {
    try {
      const newQuery = _.cloneDeep(baseController.applyFindOptions(queryInfo))
      const pollRankIds = await this.getPollListUsingPullUpPackageFromRedis()
      if (pollRankIds?.length > 0) {
        newQuery.order = [
          [
            sequelize.literal(
              `CASE WHEN id IN (${pollRankIds.join(',')}) THEN 1 ELSE 2 END`,
            ),
            'ASC',
          ],
          ['createdAt', 'DESC'],
        ]
      }

      return this.model.findAndCountAll(newQuery)
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  /**
   @param userId
   * My Posts Page:
   * All posts were created by me (don't include posts from any group).
   * This list will be shown on the My Feed Page (My Posts).
   * Ordered by created_time. If a post was used by "Pull Up", this post will be displayed first on the My Posts Page.
   */
  public async myPollPage(
    userId: uuid,
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Poll> | null> {
    try {
      const extendedQueryInfo = this.cloneQueryInfoWithFilter(queryInfo, {
        userId,
        groupId: null,
      })
      return await this.getList(extendedQueryInfo)
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  /**
   * @param userId
   * @param queryInfo
   * @description
   * All posts that I was tagged (poll_mentions table) and All posts of groups that I joined with the condition is these groups are public.
   * Ordered by created_time.
   */
  public async pollPage(
    userId: uuid,
    queryInfo: ICrudOption,
  ): Promise<GetListRepository<Poll> | null> {
    try {
      const publicGroupsThatJoined = await Group.findAll({
        where: {
          isPrivate: false,
        },
        include: [
          {
            association: 'members',
            where: {
              userId,
            },
          },
        ],
        attributes: ['id'],
      })

      const publicGroupIds =
        publicGroupsThatJoined?.map((group) => group.id) || []

      const pollThatMentioned = await PollMention.findAll({
        where: {
          userId,
        },
        attributes: ['pollId'],
      })

      const pollMentionedIds =
        pollThatMentioned?.map((poll) => poll.pollId) || []

      const pollIds = [...publicGroupIds, ...pollMentionedIds]

      const extendedQueryInfo = this.cloneQueryInfoWithFilter(queryInfo, {
        filter: {
          id: pollIds,
        },
      })

      return await this.getList(extendedQueryInfo)
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async homePage(queryInfo: ICrudOption): Promise<any> {
    try {
      return await this.getList(queryInfo)
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async groupPage(userId: uuid, queryInfo: ICrudOption): Promise<any> {
    try {
      const groupsThatJoined = await GroupMember.findAll({
        where: {
          userId,
        },
        attributes: ['groupId'],
      })

      const groupIds = groupsThatJoined?.map((group) => group.groupId) || []

      const extendedQueryInfo = this.cloneQueryInfoWithFilter(queryInfo, {
        filter: {
          groupId: groupIds,
        },
      })
      return await this.getList(extendedQueryInfo)
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async getPopularity(
    queryInfo?: ICrudOption,
    pollIds: string[] = [],
  ): Promise<any> {
    try {
      let popularityPollIds: string[] | null = []
      let isReloadPopularityPolls: boolean = false

      if (pollIds?.length > 0) {
        const extendedQueryInfo = this.cloneQueryInfoWithFilter(queryInfo, {
          id: pollIds,
        })
        extendedQueryInfo.limit = popularityPollIds?.length || 0

        return await this.getList(extendedQueryInfo)
      }

      /**
       * Get list poll by date from redis first
       * If not, then query to Database
       */
      const popularityPollRedis = await redis.get(RedisConstant.POPULARITY_POLL)
      if (!popularityPollRedis) {
        isReloadPopularityPolls = true
      } else {
        const popularityRedisData = JSON.parse(popularityPollRedis)
        if (
          popularityRedisData?.date &&
          new Date().getDate() !== new Date(popularityRedisData?.date).getDate()
        ) {
          isReloadPopularityPolls = true
        }

        popularityPollIds = popularityRedisData.polls || []
      }
      if (isReloadPopularityPolls) {
        const pollIdsRedis = await PollRepository.getPopularityPolls()
        await this.getPopularity(queryInfo, pollIdsRedis || [])
      }

      // deep clone queryInfo
      const extendedQueryInfo = this.cloneQueryInfoWithFilter(queryInfo, {
        id: popularityPollIds,
      })
      extendedQueryInfo.limit = popularityPollIds?.length || 0

      return await this.getList(extendedQueryInfo)
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  public async getItem(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<Poll | null> {
    try {
      const result = await this.model.findByPk(id, {
        ...baseController.applyFindOptions(queryInfo),
      })
      return result
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async create(user: any, data: any): Promise<Poll | any> {
    try {
      return sequelize.transaction(async (transaction) => {
        const poll = await Poll.create(
          {
            ...data,
            userId: user.id,
          },
          {
            include: [
              {
                association: 'entities',
              },
              {
                association: 'answers',
              },
              {
                association: 'hashtags',
                include: [
                  {
                    association: 'hashtag',
                  },
                ],
              },
              {
                association: 'mentions',
                include: [
                  {
                    association: 'user',
                  },
                ],
              },
            ],
            transaction,
          },
        )

        return poll
      })
    } catch (error) {
      logger.error('Cannot create poll')
      logger.error(error)
      return null
    }
  }

  /**
   *
   *
   * @param {ICrudOption} [queryInfo]
   * @return {*}  {(Promise<Poll | null>)}
   * @memberof PollRepository
   * @description Update poll
   *
   * - If poll has any comments or votes, then cannot update
   */
  public async update(
    pollId: uuid,
    userId: uuid,
    data: PollType,
  ): Promise<any> {
    try {
      const countVotes = await PollVotesRepository.countAnyVoteByPoll(pollId)
      const countComments = await PollCommentRepository.countCommentsByPollId(
        pollId,
      )

      if (countVotes > 0 || countComments > 0)
        throw new Error(
          Message.POLL_CANNOT_UPDATE_BECAUSE_HAS_VOTES_OR_COMMENTS,
        )

      const includesAssociation = [
        {
          association: 'entities',
        },
        {
          association: 'answers',
        },
        {
          association: 'hashtags',
          include: [
            {
              association: 'hashtag',
            },
          ],
        },
        {
          association: 'mentions',
          include: [
            {
              association: 'user',
            },
          ],
        },
      ]

      await sequelize.transaction(async (transaction) => {
        await Poll.findByPk(pollId, {
          include: includesAssociation,
          transaction,
        }).then(async (poll) => {
          if (!poll) throw new Error(Message.POLL_NOT_FOUND)
          if (poll.userId != userId) throw new Error(Message.POLL_NOT_FOUND)
          await poll.update(
            { ...data },
            {
              transaction,
            },
          )
        })
      })

      const poll = await this.model.findOne(
        baseController.applyFindOptions({
          filter: {
            id: pollId,
          },
          includes: includesAssociation,
        }),
      )
      return poll
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  /**
   *
   *
   * @param {ICrudOption} [queryInfo]
   * @return {*}  {(Promise<number | null>)}
   * @memberof PollRepository
   */
  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    try {
      const result = await this.model.destroy(queryInfo)
      return result
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  /**
   * This function to run every day at 12:00 AM (00:00) to get popularity of polls
   * This will get the most 3 polls with the highest popularity with counting of votes and views on each poll
   * And store this id to redis, then store to database in popularity table
   */

  public static async getPopularityPolls(): Promise<string[] | void> {
    try {
      logger.info(`Start get popularity polls at ${new Date()}`)
      const redisKey = RedisConstant.POPULARITY_POLL
      const popularityPolls = await redis.get(redisKey)
      if (popularityPolls) {
        logger.info({
          popularityPolls,
        })
        const purePopularityPolls = JSON.parse(popularityPolls)
        const date = new Date(purePopularityPolls.date)
        if (date.getDate() === new Date().getDate()) {
          logger.info('Popularity polls already exist for today')
          return purePopularityPolls.polls
        } else {
          /**
           * Remove popularityPolls key from redis
           */
          await redis.del(redisKey)
          await PollRepository.getPopularityPolls()
        }
      } else {
        /**
         * Finding the most 3 polls with the highest popularity with counting of votes and views on each poll
         * And store this id to redis, then store to database in popularity table
         */
        const popularityPolls = await Poll.findAll({
          where: {},
          limit: NumberUtils.randomIntToGetPopularityPolls(),
          include: [
            {
              association: 'votes',
            },
          ],
          attributes: {
            include: [
              [
                sequelize.literal(
                  '(SELECT COUNT(*) FROM "poll_votes" as "Votes" WHERE "Votes"."poll_id" = "Poll"."id")',
                ),
                'total_vote',
              ],
            ],
          },
          order: [
            ['createdAt', 'DESC'],
            ['viewCount', 'DESC'],
            [sequelize.literal('total_vote'), 'DESC'],
          ],
        })

        if (popularityPolls.length > 0) {
          /**
           * set redis key
           * then storing to database in popularity table
           */
          const popularityPollsRedis = {
            date: new Date(),
            polls: popularityPolls.map((poll) => poll.id),
          }
          await redis.set(
            redisKey,
            JSON.stringify(popularityPollsRedis),
            'EX',
            PollConstant.POPULARITY_POLL_TTL,
          )
          await sequelize.transaction(async (transaction) => {
            await PriorityPollByDate.create(
              {
                pollIds: popularityPolls.map((poll) => poll.id),
                type: 'POPULARITY',
              },
              {
                transaction,
              },
            )
          })
        }

        setTimeout(() => {
          TelegramUtil.sendToTelegram(
            `Popularity polls in ${new Date()} are: ${popularityPolls.map(
              (poll) => poll.id,
            )}`,
          )
        }, 0)

        return popularityPolls.map((poll) => poll.id)
      }
    } catch (err) {
      logger.error(err)
      return
    }
  }

  /**
   *
   * @param pollId
   * @description Push poll id to redis list PULL_UP_PACKAGE_POLL with TTL is 1 day
   */
  public async pushPollUsingPullUpPackageToRedis(
    pollId: uuid,
    score: number,
  ): Promise<void> {
    try {
      const redisKey = RedisConstant.POLL_UP_PACKAGE_LIST
      // Finding poll by id, if not exist, zadd for the new one with score and TTL is 1 day
      // Else increase score for the poll and update new TTL is 1 day
      //    remove poll from list
      //   zadd poll with new score and TTL is 1 day
      const pollList = await redis.zrange(redisKey, 0, -1)
      if (pollList.includes(pollId)) {
        // find the old score or set 0 if not exist
        const oldScore = (await redis.zscore(redisKey, pollId)) || 0
        const newScore = Number(oldScore) + score
        await redis.zrem(redisKey, pollId)
        await redis.zadd(
          redisKey,
          newScore,
          pollId,
          'EX',
          PollConstant.POLL_UP_PACKAGE_TTL,
        )
      } else {
        await redis.zadd(
          redisKey,
          score,
          pollId,
          'EX',
          PollConstant.POLL_UP_PACKAGE_TTL,
        )
      }
      return
    } catch (err) {
      logger.error(err)
      return
    }
  }

  public async getPollListUsingPullUpPackageFromRedis(): Promise<uuid[]> {
    try {
      const redisKey = RedisConstant.POLL_UP_PACKAGE_LIST
      const result = await redis.zrevrange(redisKey, 0, -1)
      logger.info({ result })
      return result
    } catch (error) {
      logger.error(error)
      return []
    }
  }
}

export default PollRepository
