import { sequelize } from '@/config/sql.config'
import { GroupMember } from '@/models/pg'

class GroupMemberRepository {
  private model

  constructor() {
    this.model = GroupMember
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

  public async joinGroup(
    groupId: uuid,
    userId: uuid,
    role?: 'MEMBER' | 'OWNER',
  ): Promise<Partial<GroupMember>> {
    return sequelize.transaction(async (transaction) => {
      return GroupMember.create(
        {
          groupId,
          userId,
          role: role || 'MEMBER',
        },
        {
          include: [
            {
              association: 'settings',
            },
          ],
          transaction,
        },
      ).then(async (instance) => {
        await instance.createSettings(
          {},
          {
            transaction,
          },
        )
        return instance
      })
    })
  }
}

export default GroupMemberRepository
