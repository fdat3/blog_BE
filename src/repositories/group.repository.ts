import { sequelize } from '@/config/sql.config'
import baseController from '@/controllers/base.controller'

import { ICrudOption } from '@/interfaces/controller.interface'
import { Group } from '@/models/pg'
import logger from '@/utils/logger.util'
import { cloneDeep } from 'lodash'

class GroupRepository {
  private model

  constructor() {
    this.model = Group
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
      const result = await this.model.findByPk(id, {
        ...baseController.applyFindOptions(queryInfo),
      })
      return result
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
        const group = await Group.create(
          {
            ...copyData,
            userId: user.id,
            members: [
              {
                role: 'OWNER',
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

        return group
      })
    } catch (error) {
      logger.error('Cannot create poll')
      logger.error(error)
      return null
    }
  }

  public async update(queryInfo?: ICrudOption): Promise<Group | null> {
    try {
      const poll = await this.model.findOne(
        baseController.applyFindOptions(queryInfo),
      )
      return poll
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async delete(queryInfo?: ICrudOption): Promise<number | null> {
    try {
      const result = await this.model.destroy(queryInfo)
      return result
    } catch (err) {
      logger.error(err)
      return null
    }
  }
}

export default GroupRepository
