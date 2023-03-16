import {
  AppleInterface,
  FacebookInterface,
  FacebookResponseInterface,
  GoogleInterface,
  GoogleResponseInterface,
  KakaoInterface,
  NaverInterface,
} from '@/interfaces/sns.interface'
import appleSignin from 'apple-signin-auth'
import logger from '@/utils/logger.util'
import Variable from '@/env/variable.env'

class SNSService {
  private FACEBOOK_URL = (token: string): string =>
    `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.width(300).height(300)`
  private GOOGLE_URL = (token: string): string =>
    `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
  private KAKAO_URL: string = `https://kapi.kakao.com/v1/user/access_token_info`
  private NAVER_URL: string = `https://openapi.naver.com/v1/nid/me`
  private APPLE_APP_ID?: string

  constructor() {
    this.APPLE_APP_ID = Variable.APPLE_ID
  }

  public async kakaoSignIn(data: KakaoInterface): Promise<any> {
    const { token } = data
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const kakaoData = await fetch(this.KAKAO_URL, {
        method: 'GET',
        headers,
      })
      if (kakaoData.ok) {
        return kakaoData.json()
      }
    } catch (err) {
      logger.error(err)
      logger.error('Cannot login with Google')
    }
    return null
  }

  public async naverSignIn(data: NaverInterface): Promise<any> {
    const { token } = data
    try {
      const naverResponse = await fetch(this.NAVER_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (naverResponse.ok) {
        return naverResponse.json()
      }
    } catch (err) {
      logger.error(err)
      logger.error('Cannot login with Naver')
    }
    return null
  }

  public async googleSignIn(
    data: GoogleInterface,
  ): Promise<Partial<GoogleResponseInterface> | null> {
    const { token } = data
    try {
      const response = await fetch(this.GOOGLE_URL(token), {
        method: 'GET',
      })
      if (response.ok) {
        const googleData: Promise<Partial<GoogleResponseInterface>> =
          response.json()
        return googleData
      }
    } catch (err) {
      logger.error(err)
      logger.error('Cannot login with Google')
    }
    return null
  }

  public async facebookSignIn(
    data: FacebookInterface,
  ): Promise<Partial<FacebookResponseInterface> | null> {
    const { token } = data
    try {
      const response = await fetch(this.FACEBOOK_URL(token), {
        method: 'GET',
      })
      if (response.ok) {
        const facebookData: Promise<Partial<FacebookResponseInterface>> =
          await response.json()
        return facebookData
      }
    } catch (err) {
      logger.error(err)
      logger.error('Cannot login with Facebook')
    }
    return null
  }

  public async appleSignIn(data: AppleInterface): Promise<any> {
    const { token } = data
    let appleData
    try {
      await appleSignin
        .verifyIdToken(token, this.APPLE_APP_ID)
        .then((result) => {
          appleData = result
        })
    } catch (err) {
      logger.error(err)
      logger.error('Cannot login with Apple')
    }

    return appleData
  }
}

export default SNSService
