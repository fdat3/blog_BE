import NumberConstant from '@/constants/number.constant'
import FirebaseUtils from '@/utils/firebase.utlls'
import logger from '@/utils/logger.util'
import * as admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
const serviceAccount = require('../firebase.config.json')

class PushNotifier {
  private app: any
  constructor() {
    this.app = initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }
  /**
   *
   * @param {string} title
   * @param {string} body
   * @param {string[]} tokens
   * @return {*}  {Promise<void>}
   * @memberof PushNotifier
   * @see https://firebase.google.com/docs/cloud-messaging/send-message#send_messages_to_multiple_devices
   * @see https://firebase.google.com/docs/cloud-messaging/concept-options#notifications_and_data_messages
   * @description Send a notification to multiple devices
   * if the number of devices is greater than 500, the function will split the array into chunks of 500 and send them one by one
   *
   */
  public async sendMulticastNotification(
    title: string,
    body: string,
    tokens: string[],
    ...args: any
  ): Promise<void> {
    try {
      if (tokens.length > 500) {
        const chunkedTokens = FirebaseUtils.chunkTokenArray(
          tokens,
          NumberConstant.FIREBASE_MULTICAST_LIMIT,
        )
        for (const chunk of chunkedTokens) {
          await this.sendMulticastNotification(title, body, chunk)
          await new Promise((resolve) =>
            setTimeout(resolve, NumberConstant.FIREBASE_MULTICAST_DELAY),
          )
        }
      } else {
        const message: any = {
          notification: {
            title: title,
            body: body,
          },
          tokens: tokens,
        }

        // Check args have topic, if have, add topic to message
        if (args.length > 0) {
          message['topic'] = args['topic']
        }

        await this.app.messaging().sendMulticast(message)
      }
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  public async sendSingleNotification(
    title: string,
    body: string,
    token: string,
  ): Promise<void> {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token,
    }
    await this.app.messaging().send(message)
  }

  public async sendTopicNotification(
    title: string,
    body: string,
    topic: string,
  ): Promise<void> {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      topic: topic,
    }
    await this.app.messaging().send(message)
  }
}

export default new PushNotifier()
