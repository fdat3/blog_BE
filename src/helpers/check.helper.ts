import NumberConstant from '@/constants/number.constant'
import logger from '@/utils/logger.util'
import TelegramUtil from '@/utils/telegram.util'
import os from 'os'
import process from 'process'

class CheckHelper {
  public static isWindows(): boolean {
    return os.platform() === 'win32'
  }

  public static isMacOS(): boolean {
    return os.platform() === 'darwin'
  }

  public static isLinux(): boolean {
    return os.platform() === 'linux'
  }

  public static isNode(): boolean {
    return process.env.BROWSER === undefined
  }

  public static isBrowser(): boolean {
    return process.env.BROWSER !== undefined
  }

  public static isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
  }

  public static isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  }

  public static checkOverload(): void {
    if (CheckHelper.isWindows()) {
      console.log('Windows')
    } else if (CheckHelper.isMacOS()) {
      console.log('MacOS')
    } else if (CheckHelper.isLinux()) {
      console.log('Linux')
    } else {
      console.log('Unknown OS')
    }

    const coreNumber = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    logger.info(`Core Number: ${coreNumber}`)
    logger.info(`Memory Usage: ${memoryUsage}`)

    if (coreNumber < 2) {
      logger.error('Core Number is too small')
    }

    // Check memory usage is too large when running in production mode
    if (CheckHelper.isProduction() && memoryUsage > 1000000000) {
      logger.error('Memory Usage is too large')
      // Send to Telegram
      const message = `Memory Usage is too large: ${memoryUsage}
      Please check the server now!`

      TelegramUtil.sendToTelegram(message, undefined, false)
    }
  }

  constructor() {
    setInterval(
      CheckHelper.checkOverload,
      NumberConstant.HELPER_INTERVAL_CHECK_OVERLOAD,
    )
  }
}

export default CheckHelper
