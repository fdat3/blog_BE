import Variable from '@/env/variable.env'
import logger from '@/utils/logger.util'
import { DateTime } from 'luxon'

const checkIsWorkingTime = (): boolean => {
  const now = DateTime.local()
  const hour = now.hour
  return hour >= 7 && hour <= 20
}

class TelegramUtil {
  private static fullUrl: string = `${Variable.TELEGRAM_URL}/sendMessage`

  public static async sendToTelegram(
    message: string,
    message_thread_id?: string,
    disable_notification: boolean = !checkIsWorkingTime(),
  ): Promise<void> {
    const body = {
      text: message,
      chat_id: Variable.TELEGRAM_ROOM,
      message_thread_id:
        message_thread_id || Variable.TELEGRAM_THREAD_ID || null,
      disable_notification,
    }
    return await fetch(this.fullUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      console.log('send to telegram')
      if (!res.ok) {
        logger.error('cannot send notify to telegram')
      }
    })
  }
}

export default TelegramUtil
