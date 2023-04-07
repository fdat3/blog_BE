import logger from '@/utils/logger.util'
import Variable from '@/env/variable.env'
import HttpException from '@/utils/exceptions/http.exceptions'
import { DateTime } from 'luxon'

const checkIsWorkingTime = (): boolean => {
  const now = DateTime.local()
  const hour = now.hour
  return hour >= 7 && hour <= 20
}

class ErrorController {
  public static async sendErrorToTelegram(error: HttpException): Promise<any> {
    const fullUrl = `${Variable.TELEGRAM_URL}/sendMessage`

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

  public static async sendSignalToTelegram(signal: string): Promise<any> {
    console.log(
      'Nhan ==> ==> ==> ==> ==> ==> SendSignalToTelegram <== <== <== <== <== <==',
    )
    const fullUrl = `${Variable.TELEGRAM_URL}/sendMessage`

    const errorBody = {
      chat_id: Variable.TELEGRAM_ROOM,
      message_thread_id: Variable.TELEGRAM_THREAD_ID,
      text: `*Environment: ${Variable.NODE_ENV.toUpperCase()}*
At: ${new Date().toString()}
Signal: ${signal.toUpperCase()},`,
      parse_mode: 'Markdown',
      disable_notification: !checkIsWorkingTime(),
    }

    return await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(errorBody),
    }).then(async (res) => {
      console.log('sendSignalToTelegram')
      if (!res.ok) {
        logger.error('cannot send notify to telegram')
      }
    })
  }
}

export default ErrorController
