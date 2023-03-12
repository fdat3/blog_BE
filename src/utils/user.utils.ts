import NumberConstant from '@/constants/number.constant'

class UserUtils {
  public static generateInviteCode(
    length: number = NumberConstant.DEFAULT_LENGTH,
  ): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
}

export default UserUtils
