import UserRepository from '@/repositories/user.repository'
import UserSecurity from '@/security/user.security'
import SNSService from '@/services/sns.service'
import { CheckUserExistInterface } from '@/interfaces/auth.interface'
import { SNSEnum } from '@/enums/auth.enum'

class AuthService {
  private userRepository: UserRepository
  private userSecurity: UserSecurity
  private snsService: SNSService

  constructor() {
    this.userRepository = new UserRepository()
    this.userSecurity = new UserSecurity()
    this.snsService = new SNSService()
  }

  public async findByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findByUsername(username)
    return user
  }

  public async findByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email)
    return user
  }

  public async findByPhone(phone: string): Promise<any> {
    const user = await this.userRepository.findByPhone(phone)
    return user
  }

  public async findByEmailWithPassword(email: string): Promise<any> {
    const user = await this.userRepository.findByEmailWithPassword(email)
    return user
  }

  public comparePassword(password: string, decryptedPassword: string): boolean {
    return this.userSecurity.comparePassword(password, decryptedPassword)
  }

  public async createUser(user: any, device?: any): Promise<any> {
    const encryptedPassword = this.userSecurity.encrypt(user.password)
    const newUser = {
      ...user,
      password: encryptedPassword,
    }
    const savedUser = await this.userRepository.createUser(newUser, device)
    return savedUser
  }

  public async generateAccessToken(
    id: string,
    isAdmin: boolean,
  ): Promise<string> {
    const token = this.userSecurity.generateAccessToken(id, isAdmin)
    return token
  }

  public async snsLogin(data: any, type: SNSEnum): Promise<any> {
    let result: any
    const { token, device }: Omit<any, 'token'> = data
    switch (type) {
      case SNSEnum.APPLE:
        result = await this.snsService.appleSignIn(token)
        break
      case SNSEnum.FACEBOOK:
        result = await this.snsService.facebookSignIn(token)
        break
      case SNSEnum.GOOGLE:
        result = await this.snsService.googleSignIn(token)
        break
      case SNSEnum.KAKAO:
        result = await this.snsService.kakaoSignIn(token)
        break
      case SNSEnum.NAVER:
        result = await this.snsService.naverSignIn(token)
        break
      default:
        result = null
    }

    // check user existed in db
    const isUserExisted: boolean = await this.checkUserExisted(result)

    if (!isUserExisted) {
      // create new SNS User
      const snsUser = {
        email: result.email,
        username: result.username || result.email,
      }
      return await this.userRepository.createUser(snsUser, device)
    } else {
      const { email } = result
      const snsUser = await this.userRepository.findByEmail(email)
      return snsUser
    }
  }

  private async checkUserExisted(
    data: Partial<CheckUserExistInterface>,
  ): Promise<boolean> {
    const { email } = data
    if (email) {
      const user = await this.userRepository.findByEmail(email)
      return !!user
    }
    return false
  }
}

export default AuthService
