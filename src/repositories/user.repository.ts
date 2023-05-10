// import UserInterface from "@/interfaces/user.interface";
import { sequelize } from '@/config/sql.config'
import {
  // default as BaseController,
  default as baseController,
} from '@/controllers/base.controller'
import { ICrudOption } from '@/interfaces/controller.interface'
import { User } from '@/models/pg'
import logger from '@/utils/logger.util'

class UserRepository {
  private model
  // private baseController = new BaseController()

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
      logger.error(e)
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

  public async findByFullname(fullname: string): Promise<Partial<User> | null> {
    const user = await User.findOne({
      where: {
        fullname,
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

  public async findByIdWithPassword(id: string): Promise<Partial<User> | null> {
    const user = await User.findByPk(id)
    if (user) {
      return user.get({ plain: true })
    }
    return null
  }

  public async findByFullnameWithPassword(
    fullname: string,
  ): Promise<User | null> {
    const user = await User.scope('withPassword').findOne({
      where: { fullname },
    })
    return user
  }

  public async createUser(data: any): Promise<Partial<User> | null> {
    try {
      const result: User = await sequelize.transaction(async (transaction) => {
        const newUser: User = await User.create(
          {
            ...data,
          },
          {
            transaction,
          },
        )
        return newUser
      })
      return result.get({ plain: true })
    } catch (e) {
      logger.error(e)
      return null
    }
  }
  public async deleteUser(id: any): Promise<any> {
    try {
      return sequelize.transaction(async (transaction) => {
        return User.destroy({
          where: {
            id,
          },
          transaction,
        })
      })
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async updateFullname(
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

  public async updateDob(id: string, dob: Date): Promise<Partial<User> | null> {
    try {
      return await sequelize.transaction(async (transaction) => {
        await User.update(
          {
            dob,
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
    } catch (error) {
      logger.error(error)
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

  public async getUsersStats(): Promise<Partial<User[]> | null> {
    const users = await User.findAll()
    return users
  }

  // public async updateAny(data: Partial<User>): Promise<Partial<User> | null> {
  //   const { id, ...body } = data
  //   const user = await User.findOne({
  //     where: {
  //       id,
  //     },
  //   })
  //   if (!user) {
  //     return null
  //   }
  //   try {
  //     return sequelize.transaction(
  //       async (transaction): Promise<Partial<User> | null> => {
  //         if (Object.keys(body).length > 0) {
  //           await user.update(body, { transaction })
  //         }

  //         return await this.model.findOne({
  //           where: {
  //             id: user.id,
  //           },
  //           raw: true,
  //           nest: true,
  //         })
  //       },
  //     )
  //   } catch (err) {
  //     logger.error(err)
  //     return null
  //   }
  // }
}

export default UserRepository
