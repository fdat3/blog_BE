import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import Variable from '@/env/variable.env'

class UserSecurity {
  public encrypt(password: string): string {
    return CryptoJS.AES.encrypt(password, Variable.PASS_SECRET).toString()
  }

  public decrypt(password: string): string {
    return CryptoJS.AES.decrypt(password, Variable.PASS_SECRET).toString(
      CryptoJS.enc.Utf8,
    )
  }

  public comparePassword(password: string, decryptedPassword: string): boolean {
    return password === this.decrypt(decryptedPassword)
  }

  public generateAccessToken(id: string, isAdmin: boolean): string {
    const token = jwt.sign({ id, isAdmin }, Variable.JWT_SECRET, {
      expiresIn: '30m',
    })

    return `Bearer ${token}`
  }

  public generateRefreshToken(
    id: string,
    isAdmin: boolean,
    deviceId?: string,
  ): string {
    const token = jwt.sign({ id, isAdmin, deviceId }, Variable.JWT_SECRET, {
      expiresIn: '1d',
    })

    return `${token}`
  }

  public generateSecretKey(): string {
    let passphrase = ''
    const hex = '0123456789abcdef'
    let i = 64
    while (i >= 0) {
      passphrase += hex.charAt(Math.floor(Math.random() * 16))
      i--
    }

    return passphrase
  }
}

export default UserSecurity
