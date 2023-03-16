import { SNSEnum } from '@/enums/auth.enum'
export interface CheckUserExistInterface {
  email?: string
}

export interface CreateSNSUserInterface {
  email?: string
  picture?: string
  username?: string

  [key: string]: any
  device?: DeviceInterface
}

export interface DeviceInterface {
  deviceId?: string
  loginType?: SNSEnum
  fcmToken?: string
}
