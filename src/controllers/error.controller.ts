import logger from '@/utils/logger.util'
import Variable from '@/env/variable.env'
import HttpException from '@/utils/exceptions/http.exceptions'
import { DateTime } from 'luxon'

class ErrorController {
  public static async sendErrorToTelegram(error: HttpException): Promise<any> {
    const fullUrl = `${Variable.TELEGRAM_URL}/sendMessage`

    const checkIsWorkingTime = (): boolean => {
      const now = DateTime.local()
      const hour = now.hour
      return hour >= 7 && hour <= 20
    }

    let errorString = `
*Environment: ${Variable.NODE_ENV.toUpperCase()}*
At: ${new Date().toString()}
    
Error detail:
${error}
`
    if (error?.stack) {
      errorString += '```' + error.stack + '```'
    }

    const errorBody = {
      chat_id: Variable.TELEGRAM_ROOM,
      message_thread_id: Variable.TELEGRAM_THREAD_ID,
      text: errorString,
      parse_mode: 'Markdown',
      disable_notification: !checkIsWorkingTime(), // Disable notification
    }

    logger.info({ disable_notification: errorBody.disable_notification })

    return await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(errorBody),
    }).then(async (res) => {
      if (!res.ok) {
        logger.error('cannot send notify to telegram')
      }
    })
  }
}

export default ErrorController
