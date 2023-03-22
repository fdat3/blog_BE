import { sequelize } from '@/config/sql.config'
import baseController from '@/controllers/base.controller'

import { ICrudOption } from '@/interfaces/controller.interface'
import { Group, GroupMember } from '@/models/pg'
import logger from '@/utils/logger.util'
import { cloneDeep } from 'lodash'
import GroupMemberRepository from '@/repositories/group_member.repository'

class GroupRepository {
  private model
  private groupMemberRepository: GroupMemberRepository
  constructor() {
    this.model = Group
    this.groupMemberRepository = new GroupMemberRepository()
  }

  public async getList(
    queryInfo?: ICrudOption,
  ): Promise<{ rows: Partial<Group[]>; count: number } | null> {
    try {
      return this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
    } catch (e) {
      logger.error(e)
      return null
    }
  }

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

  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    try {
      return this.model.destroy(queryInfo)
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async findMember(userId: uuid, groupId: uuid): Promise<any> {
    return this.groupMemberRepository.findMember(userId, groupId)
  }

  async joinGroup(userId: uuid, groupId: uuid): Promise<any> {
    try {
      const group = await Group.findByPk(groupId)

      if (!group) return false

      // check member existed in group
      const member = await group.countMembers({
        where: {
          userId,
        },
      })

      console.log({ member })

      if (member == 0) {
        return sequelize.transaction(async (transaction) => {
          const createData: Partial<GroupMember> | any = {
            userId,
            groupId,
            role: 'MEMBER',
            settings: {},
          }
          return GroupMember.create(
            {
              ...createData,
            },
            {
              include: [
                {
                  association: 'settings',
                },
              ],
              transaction,
            },
          )
        })
      } else {
        return false
      }
    } catch (err) {
      logger.error('Join member error in group.repository.ts')
      logger.error(err)
      return null
    }
  }
}

export default GroupRepository
