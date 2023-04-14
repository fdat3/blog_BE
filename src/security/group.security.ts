import Variable from '@/env/variable.env'
import CryptoJS from 'crypto-js'

class GroupSecurity {
  public static hashPasswordOfGroup(password: string): string {
    return CryptoJS.AES.encrypt(password, Variable.PASS_SECRET).toString()
  }

  public static decryptPasswordOfGroup(password: string): string {
    return CryptoJS.AES.decrypt(password, Variable.PASS_SECRET).toString(
      CryptoJS.enc.Utf8,
    )
  }

  public static comparePasswordOfGroup(
    password: string,
    decryptedPassword: string,
  ): boolean {
    return password === decryptedPassword
  }
}

export default GroupSecurity
