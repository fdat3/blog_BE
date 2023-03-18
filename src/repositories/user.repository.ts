// import User from "@/models/mongo/user.model";
// import UserInterface from "@/interfaces/user.interface";
import { User, UserDevice } from '@/models/pg'
import { sequelize } from '@/config/sql.config'
import logger from '@/utils/logger.util'
import { DeviceInterface } from '@/interfaces/auth.interface'
import { ICrudOption } from '@/interfaces/controller.interface'
import BaseController from '@/controllers/base.controller'
import baseController from '@/controllers/base.controller'

class UserRepository {
  private model
  private baseController = new BaseController()

  constructor() {
    this.model = User
  }

  public async findAll(
    queryInfo?: ICrudOption,
  ): Promise<{ rows: Partial<User[]>; count: number } | null> {
    try {
      const users = await this.model.findAndCountAll(
        baseController.applyFindOptions(queryInfo),
      )
      return users
    } catch (e) {
      console.log(e)
      return null
    }
  }

  public async findById(id: string): Promise<Partial<User> | null> {
    const user = await User.findByPk(id)
    if (user) {
      return user.get({ plain: true })
    }
    return null
  }

  public async findByUsername(username: string): Promise<Partial<User> | null> {
    const user = await User.findOne({
      where: {
        username,
      },
    })
    if (user) {
      return user.get({ plain: true })
    }
    return null
  }

  public async findByEmail(email: string): Promise<Partial<User> | null> {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    if (user) {
      return user.get({ plain: true })
    }
    return null
  }

  public async findByPhone(phone: string): Promise<Partial<User> | null> {
    const user = await User.findOne({
      where: { phone },
    })
    if (user) {
      return user.get({ plain: true })
    }
    return null
  }

  public async findByIdWithPassword(id: string): Promise<Partial<User> | null> {
    const user = await User.findByPk(id)
    if (user) {
      return user.get({ plain: true })
    }
    return null
  }

  public async findByUsernameWithPassword(
    username: string,
  ): Promise<User | null> {
    const user = await User.findOne({
      where: { username },
    })
    return user
  }

  public async findByEmailWithPassword(
    email: string,
  ): Promise<Partial<User> | null> {
    try {
      const user = await User.scope('withPassword').findOne({
        where: { email },
      })
      if (user) {
        return user.get({ plain: true })
      }
      return null
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async findByPhoneWithPassword(
    phone: string,
  ): Promise<Partial<User> | null> {
    const user = await User.findOne({ where: { phone } })
    return user
  }

  public async createUser(
    user: any,
    device?: DeviceInterface,
  ): Promise<Partial<User> | null> {
    try {
      const result: User = await sequelize.transaction(async (transaction) => {
        const newUser: User = await User.create(
          {
            ...user,
          },
          {
            transaction,
          },
        )

        if (device) {
          await newUser.createDevice({
            ...device,
          })
        }

        return newUser
      })
      return result.get({ plain: true })
    } catch (e) {
      logger.error(e)
      return null
    }
  }

  public async updateUsername(
    id: string,
    username: string,
  ): Promise<Partial<User> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update(
          {
            username,
          },
          {
            where: {
              id,
            },
            transaction,
          },
        )

        return await User.findByPk(id, {
          plain: true,
        })
      })
    } catch (e) {
      return null
    }
  }

  public async updateName(
    id: string,
    fullname: string,
  ): Promise<Partial<User> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update(
          {
            fullname,
          },
          {
            where: {
              id,
            },
            transaction,
          },
        )

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async updateEmail(
    id: string,
    email: string,
  ): Promise<Partial<User> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update(
          {
            email,
          },
          {
            where: {
              id,
            },
            transaction,
          },
        )

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async updatePassword(
    id: string,
    password: string,
  ): Promise<Partial<User> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update(
          {
            password,
          },
          {
            where: {
              id,
            },
            transaction,
          },
        )

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async updatePhone(
    id: string,
    phone: string,
  ): Promise<Partial<User> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update(
          {
            phone,
          },
          {
            where: {
              id,
            },
            transaction,
          },
        )

        return await User.findByPk(id)
      })
    } catch (e) {
      return null
    }
  }

  public async deleteUser(id: string): Promise<Partial<User> | null> {
    const user = await User.findByPk(id)
    user?.destroy()
    return user
  }

  public async getUsersStats(): Promise<Partial<User[]> | null> {
    const users = await User.findAll()
    return users
  }

  public async updateAny(data: Partial<User>): Promise<Partial<User> | null> {
    const { id, ...body } = data
    const user = await User.findOne({
      where: {
        id,
      },
    })
    if (!user) {
      return null
    }
    try {
      return sequelize.transaction(
        async (transaction): Promise<Partial<User> | null> => {
          if (Object.keys(body).length > 0) {
            await user.update(body, { transaction })
          }

          return await this.model.findOne({
            where: {
              id: user.id,
            },
            include: [
              {
                association: 'mbti',
              },
            ],
            raw: true,
            nest: true,
          })
        },
      )
    } catch (err) {
      console.log(err)
      logger.error(err)
      return null
    }
  }

  public async addDevice(user: User, device: UserDevice): Promise<void> {
    try {
      await UserDevice.findOrCreate({
        where: {
          ...device,
        },
        defaults: {
          ...device,
          userId: user.id,
        },
      })
    } catch (err) {
      logger.error('Error while create new device')
      logger.error(err)
    }
  }
}

export default UserRepository
