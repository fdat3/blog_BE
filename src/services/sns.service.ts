import {
  FacebookInterface,
  FacebookResponseInterface,
  GoogleInterface,
  GoogleResponseInterface,
} from '@/interfaces/sns.interface'
import logger from '@/utils/logger.util'
import fetch from 'node-fetch'

class SNSService {
  private FACEBOOK_URL = (token: string): string =>
    `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.width(300).height(300)`
  private GOOGLE_URL = (token: string): string =>
    `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`

  public async googleSignIn(
    data: GoogleInterface,
  ): Promise<Partial<GoogleResponseInterface> | null> {
    const { token } = data
    try {
      const response = await fetch(this.GOOGLE_URL(token), {
        method: 'GET',
      })
      if (response.ok) {
        const googleData: Promise<Partial<GoogleResponseInterface> | any> =
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
        const facebookData: Promise<Partial<FacebookResponseInterface> | any> =
          response.json()
        return facebookData
      }
    } catch (err) {
      logger.error(err)
      logger.error('Cannot login with Facebook')
    }
    return null
  }
}

export default SNSService
