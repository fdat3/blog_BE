import { sequelize } from '@/config/sql.config'
import { GroupMember } from '@/models/pg'
import GroupActivityRepository from '@/repositories/group_activity.repository'
import logger from '@/utils/logger.util'

class GroupMemberRepository {
  private model
  private groupActivityRepository: GroupActivityRepository
  constructor() {
    this.model = GroupMember
    this.groupActivityRepository = new GroupActivityRepository()
  }

  public async findMember(
    userId: uuid,
    groupId: uuid,
  ): Promise<Partial<GroupMember> | null> {
    return GroupMember.findOne({
      where: {
        groupId,
        userId,
      },
    })
  }

  /**
   *
   *
   * @param {uuid} groupId
   * @param {uuid} userId
   * @param {('MEMBER' | 'OWNER')} [role='MEMBER']
   * @param {boolean} [isInvitedByAdmin=false]
   * @return {*}  {Promise<Partial<GroupMember>>}
   * @memberof GroupMemberRepository
   */
  public async joinGroup(
    groupId: uuid,
    userId: uuid,
    role: 'MEMBER' | 'OWNER' = 'MEMBER',
    isInvitedByAdmin: boolean = false,
  ): Promise<Partial<GroupMember>> {
    try {
      return sequelize.transaction(async (transaction) => {
        const createBody = {
          groupId,
          userId,
          role: role || 'MEMBER',
          settings: {},
        }
        return GroupMember.create(createBody, {
          include: [
            {
              association: 'settings',
            },
          ],
          transaction,
        }).then(async (instance) => {
          // Create Group Activity
          const activityBody: any = {
            groupId,
            userId,
            type: isInvitedByAdmin ? 'INVITE_MEMBER_BY_ADMIN' : 'JOIN_GROUP',
          }

          await this.groupActivityRepository.create(activityBody)
          return instance
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
   * @param {uuid} groupId
   * @return {*}  {Promise<number>}
   * @memberof GroupMemberRepository
   */
  public async countMemberInGroup(groupId: uuid): Promise<number> {
    return GroupMember.count({
      where: {
        groupId,
      },
    })
  }
}

export default GroupMemberRepository
