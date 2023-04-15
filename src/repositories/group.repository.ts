import { sequelize } from '@/config/sql.config'
import baseController from '@/controllers/base.controller'

import { ICrudOption } from '@/interfaces/controller.interface'
import { Group, GroupMember } from '@/models/pg'
import logger from '@/utils/logger.util'
import { cloneDeep } from 'lodash'
import GroupMemberRepository from '@/repositories/group_member.repository'
import { GetListRepository } from '@/interfaces/base.interface'
import GroupSecurity from '@/security/group.security'
import Message from '@/constants/message.constant'

class GroupRepository {
  private model
  private groupMemberRepository: GroupMemberRepository
  constructor() {
    this.model = Group
    this.groupMemberRepository = new GroupMemberRepository()
  }
  /**
   *
   *
   * @param {ICrudOption} [queryInfo]
   * @return {*}  {(Promise<{ rows: Partial<Group[]>; count: number } | null>)}
   * @memberof GroupRepository
   */
  public async getList(
    queryInfo: ICrudOption = {},
  ): Promise<{ rows: Partial<Group[]>; count: number } | null> {
    try {
      const { scope } = queryInfo || { scope: ['defaultScope'] }
      return this.model
        .scope(scope)
        .findAndCountAll(baseController.applyFindOptions(queryInfo))
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  /**
   *
   *
   * @param {uuid} id
   * @param {ICrudOption} [queryInfo]
   * @return {*}  {(Promise<Group | null>)}
   * @memberof GroupRepository
   */
  public async getItem(
    id: uuid,
    queryInfo?: ICrudOption,
  ): Promise<Group | null> {
    try {
      return this.model.findByPk(id, {
        ...baseController.applyFindOptions(queryInfo),
      })
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  /**
   *
   *
   * @param {*} user
   * @param {*} data
   * @return {*}  {(Promise<Group | any>)}
   * @memberof GroupRepository
   */
  public async create(user: any, data: any): Promise<Group | any> {
    try {
      /**
       * Schema when create group members with Owner role
       * data = {
       *   ...groupData,
       *   settings: {
       *     ...group settings
       *   },
       *   members: [{
       *     userId: user.id,
       *     role: 'OWNER',
       *     settings: {}
       *   }]
       * }
       */

      if ('password' in data) {
        // Hashing password
        data.password = await GroupSecurity.hashPasswordOfGroup(data.password)
      }

      return sequelize.transaction(async (transaction) => {
        const copyData = cloneDeep(data)
        if (!('settings' in copyData)) {
          copyData.settings = {}
        }

        if ('members' in copyData) {
          copyData.members = [
            ...copyData.members,
            {
              role: 'OWNER',
              userId: user.id,
              settings: {},
            },
          ]
        }
        return Group.create(
          {
            ...copyData,
            ownerId: user.id,
            members: [
              {
                role: 'OWNER',
                userId: user.id,
                settings: {},
              },
            ],
          },
          {
            include: [
              {
                association: 'settings',
              },
              {
                association: 'members',
                include: [
                  {
                    association: 'settings',
                  },
                ],
              },
            ],
            transaction,
          },
        )
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
   * @param {uuid} id
   * @param {uuid} userId
   * @param {*} data
   * @return {*}  {(Promise<Group | boolean | null>)}
   * @memberof GroupRepository
   */
  public async update(
    id: uuid,
    userId: uuid,
    data: any,
  ): Promise<Group | boolean | null> {
    try {
      return sequelize.transaction(async (transaction) => {
        return Group.findOne({
          where: {
            id,
          },
          include: [
            {
              association: 'settings',
            },
          ],
          transaction,
        })
          .then(async (instance) => {
            if (instance) {
              if (instance.ownerId !== userId) return false
              await instance.update({ ...data }, { transaction })
              return instance
            } else return null
          })
          .catch((err) => {
            logger.error(err)
            return null
          })
      })
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
   * @memberof GroupRepository
   */
  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    try {
      return this.model.destroy(queryInfo)
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  /**
   *
   *
   * @param {uuid} userId
   * @param {uuid} groupId
   * @return {*}  {Promise<any>}
   * @memberof GroupRepository
   */
  public async findMember(userId: uuid, groupId: uuid): Promise<any> {
    return this.groupMemberRepository.findMember(userId, groupId)
  }

  /**
   *
   *
   * @param {uuid} userId
   * @param {uuid} groupId
   * @return {*}  {Promise<any>}
   * @memberof GroupRepository
   */
  async inviteMemberByAdmin(userId: uuid, groupId: uuid): Promise<any> {
    try {
      return await this.groupMemberRepository.joinGroup(
        groupId,
        userId,
        'MEMBER',
        true,
      )
    } catch (err) {
      logger.error('Invite member by admin error in group.repository.ts')
      logger.error(err)
      throw err
      return null
    }
  }

  /**
   *
   *
   * @param {uuid} userId
   * @param {uuid} groupId
   * @param {string} [password]
   * @return {*}  {Promise<any>}
   * @memberof GroupRepository
   */
  async joinGroup(
    userId: uuid,
    groupId: uuid,
    password?: string,
  ): Promise<any> {
    try {
      const group = await Group.scope('withPassword').findByPk(groupId)

      if (!group) return false

      if ('password' in group) {
        if (!password) throw new Error(Message.JOIN_GROUP_PASSWORD_REQUIRED)

        const isMatch = GroupSecurity.comparePasswordOfGroup(
          password,
          group.password,
        )
        if (!isMatch) throw new Error(Message.JOIN_GROUP_WRONG_PASSWORD)
      }

      return await this.groupMemberRepository.joinGroup(
        groupId,
        userId,
        'MEMBER',
      )
    } catch (err) {
      logger.error('Join member error in group.repository.ts')
      logger.error(err)
      return null
    }
  }

  /**
   *
   * @description Leaving group
   * @param {uuid} userId
   * @param {uuid} groupId
   * @return {*}  {Promise<any>}
   * @memberof GroupRepository
   */
  public async leaveGroup(userId: uuid, groupId: uuid): Promise<any> {
    try {
      const group = await Group.findByPk(groupId)

      if (!group) return false

      // check member existed in group
      const member = await group.countMembers({
        where: {
          userId,
        },
      })

      if (member == 0) {
        return false
      } else {
        return sequelize.transaction(async (transaction) => {
          return GroupMember.destroy({
            where: {
              userId,
              groupId,
            },
            transaction,
          })
        })
      }
    } catch (err) {
      logger.error('Leave member error in group.repository.ts')
      logger.error(err)
      return null
    }
  }
  /**
   *
   * @description Get public group, order by createdAt DESC, numbers of members DESC
   * @param {ICrudOption} [queryInfo]
   * @return {*}  {Promise<any>}
   * @memberof GroupRepository
   */
  public async publicGroup(
    queryInfo?: ICrudOption,
  ): Promise<GetListRepository<Group> | any> {
    try {
      // Overwrite queryInfo to get public group, order by createdAt DESC, numbers of members DESC
      const newQuery: ICrudOption = {
        ...queryInfo,
        filter: {
          ...queryInfo?.where,
          isPrivate: false,
        },
        order: [
          ['createdAt', 'DESC'],
          // Order by numbers of members DESC
          [sequelize.literal('membersCount'), 'DESC'],
        ],
        include: [
          {
            association: 'settings',
          },
          {
            association: 'members',
            include: [
              {
                association: 'user',
                attributes: ['id', 'fullname', 'avatar'],
              },
              {
                association: 'settings',
              },
            ],
          },
        ],
      }

      return this.getList(newQuery)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}

export default GroupRepository
