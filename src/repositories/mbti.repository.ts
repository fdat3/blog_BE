import { sequelize } from '@/config/sql.config'
import logger from '@/utils/logger.util'
import { Mbti } from '@/models/pg'

class MbtiRepository {
  public model

  constructor() {
    this.model = Mbti
  }

  public async findAll(): Promise<Mbti[]> {
    return await this.model.findAll()
  }

  public async findById(id: uuid): Promise<Mbti | null> {
    const result = await Mbti.findByPk(id)
    return result
  }

  public async findByLabel(label: string): Promise<Mbti[]> {
    return await this.model.findAll({
      where: {
        label: {
          '%iLike': label,
        },
      },
    })
  }

  public async createMbti(label: string): Promise<Mbti | null> {
    try {
      const result = await sequelize.transaction(async (transaction) => {
        const mbti = await Mbti.create(
          {
            label,
          },
          {
            transaction,
          },
        )

        return mbti
      })

      return result
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  public async updateMbti(id: uuid, label: string): Promise<Mbti | null> {
    try {
      const result = await sequelize.transaction(async (transaction) => {
        await Mbti.update(
          {
            label,
          },
          {
            where: {
              id,
            },
            transaction,
          },
        )

        return await this.findById(id)
      })

      return result
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  public async deleteMbti(id: uuid): Promise<Mbti | null> {
    try {
      const result = await sequelize.transaction(async (transaction) => {
        const mbti = await this.findById(id)

        await mbti?.destroy({
          transaction,
        })

        return mbti
      })

      return result
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  public async deleteMultipleMbtis(ids: uuid[]): Promise<number | null> {
    try {
      const result: number = await sequelize.transaction(
        async (transaction): Promise<number> => {
          const destroyedCount = await this.model.destroy({
            where: {
              id: {
                in: ids,
              },
            },
            transaction,
          })
          return destroyedCount
        },
      )

      return result
    } catch (e) {
      logger.error(e)
      return null
    }
  }
}

export default MbtiRepository
