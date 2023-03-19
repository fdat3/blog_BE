import Variable from '@/env/variable.env'
import HttpException from '@/utils/exceptions/http.exceptions'
import logger from '@/utils/logger.util'
import fetch from 'node-fetch'

class ErrorController {
  public static async sendErrorToTelegram(error: HttpException): Promise<any> {
    logger.error({ error })
    const fullUrl = `${Variable.TELEGRAM_URL}/sendMessage`

    const errorString = `
<strong>Environment:</strong> <b>${Variable.NODE_ENV.toUpperCase()}</b>
<i>At: ${new Date().toString()}</i>
    
<strong>Error detail:</strong>
<pre>${error.stack}</pre>
`

    const errorBody = {
      chat_id: Variable.TELEGRAM_ROOM,
      message_thread_id: Variable.TELEGRAM_THREAD_ID,
      text: errorString,
      parse_mode: 'HTML',
    }

    return fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(errorBody),
    })
  }

  // private async findTopicId(): Promise<any> {
  //   // const today = new Date()
  //   // let mm: string | number = today.getMonth() + 1; // Months start at 0!
  //   // let dd: string | number = today.getDate()
  //   // if (dd < 10) dd = '0' + dd;
  //   // if (mm < 10) mm = '0' + mm;
  //   // const todayString = `${today.getFullYear()}_${mm}_${dd}`
  //
  //   // Find existed topic
  //
  //   return ''
  // }
  //
  // private async createNewTopicToday(topic_id: string): Promise<any> {
  //
  // }
}

export default ErrorController
