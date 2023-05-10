import UserRepository from '@/repositories/user.repository'
import UserSecurity from '@/security/user.security'
import { User } from '@/models/pg'
import { ICrudOption } from '@/interfaces/controller.interface'

class UserService {
  private userRepository: UserRepository
  private userSecurity: UserSecurity
  constructor() {
    this.userRepository = new UserRepository()
    this.userSecurity = new UserSecurity()
  }
  public comparePassword(password: string, encryptedPassword: string): boolean {
    return this.userSecurity.comparePassword(password, encryptedPassword)
  }

  public async createUser(user: any): Promise<Partial<User> | null> {
    const encryptedPassword = this.userSecurity.encrypt(user.password)
    const newUser = {
      ...user,
      password: encryptedPassword,
    }
    const savedUser = await this.userRepository.createUser(newUser)
    return savedUser
  }

  public async deleteUser(id: any): Promise<any> {
    const user = await this.userRepository.deleteUser(id)
    return user
  }
  public async findAll(queryInfo?: ICrudOption): Promise<any> {
    const users = await this.userRepository.findAll(queryInfo)
    return users
  }

  public async findById(id: string): Promise<any> {
    const user = await this.userRepository.findById(id)
    return user
  }
  public async findByFullname(fullname: string): Promise<any> {
    const user = await this.userRepository.findByFullname(fullname)
    return user
  }
  public async findByFullnameWithPassword(fullname: string): Promise<any> {
    const user = await this.userRepository.findByFullnameWithPassword(fullname)
    return user
  }
  public async findByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email)
    return user
  }
  public async findByIdWithPassword(id: string): Promise<any> {
    const user = await this.userRepository.findByIdWithPassword(id)
    return user
  }
  public async updateFullname(id: string, fullname: string): Promise<any> {
    const user = await this.userRepository.updateFullname(id, fullname)
    return user
  }
  public async updateName(id: string, name: string): Promise<any> {
    const user = await this.userRepository.updateName(id, name)
    return user
  }
  public async updateEmail(id: string, email: string): Promise<any> {
    const user = await this.userRepository.updateEmail(id, email)
    return user
  }
  public async updatePassword(id: string, password: string): Promise<any> {
    const encryptedPassword = this.userSecurity.encrypt(password)
    return this.userRepository.updatePassword(id, encryptedPassword)
  }
  public async updateDob(id: string, dob: Date): Promise<any> {
    const user = await this.userRepository.updateDob(id, dob)
    return user
  }
  public async getUsersStats(): Promise<any> {
    // const date = new Date()
    // const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    const usersStats = await this.userRepository.getUsersStats()
    return usersStats
  }
  // public async updateAny(data: User): Promise<Partial<User> | null> {
  //   const result = await this.userRepository.updateAny(data)
  //   return result
  // }
}

export default UserService
