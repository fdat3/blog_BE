import LikeRepository from '@/repositories/like.repository'
import { sequelize } from '@/config/sql.config'
import { GetListRepository } from '@/interfaces/base.interface'
import { Like, PollComment } from '@/models/pg'
import logger from '@/utils/logger.util'
import { Includeable } from 'sequelize'
import Message from '@/constants/message.constant'

class PollCommentRepository {
  public model = PollComment
  public likeRepository = new LikeRepository()
  public static readonly DEFAULT_INCLUDES: Includeable = {
    all: true,
    nested: true,
  }

  /**
   *
   *
   * @param {PollComment} pollComment
   * @return {*}  {Promise<any>}
   * @memberof PollCommentRepository
   */
  public async create(pollComment: PollComment): Promise<any> {
    try {
      return sequelize.transaction(async (transaction) => {
        return this.model.create(pollComment, {
          include: PollCommentRepository.DEFAULT_INCLUDES,
          transaction,
        })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  /**
   *
   *
   * @param {uuid} id
   * @param {PollComment} data
   * @return {*}  {Promise<any>}
   * @memberof PollCommentRepository
   */
  public async update(id: uuid, data: PollComment): Promise<any> {
    try {
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then(async (pollComment) => {
            if (!pollComment) throw new Error('PollComment not found')
            await pollComment.update(data, { transaction })
          })
          .catch((err) => {
            throw err
          })
      })
      return this.model.findByPk(id)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  /**
   *
   *
   * @param {uuid} id
   * @return {*}  {(Promise<PollComment | null>)}
   * @memberof PollCommentRepository
   */
  public async findOne(id: uuid): Promise<PollComment | null> {
    try {
      return await this.model.findByPk(id, {
        include: PollCommentRepository.DEFAULT_INCLUDES,
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public static async countCommentsByPollId(pollId: uuid): Promise<number> {
    try {
      return await PollComment.count({
        where: {
          pollId,
        },
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  // TODO: Get Comment with recursive replying
  public static async getCommentsByPoll(
    pollId: uuid,
  ): Promise<GetListRepository<PollComment>> {
    try {
      return await PollComment.findAndCountAll({
        where: {
          pollId,
        },
        include: [
          {
            model: PollComment,
            as: 'reply',
          },
        ],
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async delete(
    id: uuid,
    userId: uuid,
  ): Promise<{
    isSuccess: boolean
  }> {
    try {
      let isSuccess: boolean = false
      await sequelize.transaction(async (transaction) => {
        await this.model
          .findByPk(id, { transaction })
          .then(async (pollComment) => {
            if (!pollComment) throw new Error(Message.NOT_FOUND)
            if (pollComment.userId !== userId)
              throw new Error(Message.DELETE_RESOURCE_NOT_AUTHORIZE)

            await pollComment.destroy({ transaction })
            isSuccess = true
          })
          .catch((err) => {
            throw err
          })
      })

      return {
        isSuccess,
      }
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
  /**
   *
   *
   * @param {uuid} pollCommentId - pollCommentId
   * @param {uuid} userId
   * @return {*}  {(Promise<Like | null>)}
   * @memberof PollCommentRepository
   */
  public async createLike(
    pollCommentId: uuid,
    userId: uuid,
  ): Promise<Like | null> {
    return await this.likeRepository.create({
      userId,
      pollCommentId,
    })
  }

  /**
   *
   *
   * @param {uuid} id - likeId
   * @param {uuid} userId
   * @return {*}  {Promise<{ isSuccess: boolean }>}
   * @memberof PollCommentRepository
   */
  public async removeLike(
    id: uuid,
    userId: uuid,
  ): Promise<{ isSuccess: boolean }> {
    return await this.likeRepository.delete(id, userId)
  }
}

export default PollCommentRepository
