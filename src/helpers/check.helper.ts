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

  public static showProcessId(): void {
    logger.warn(`Process ID: ${process.pid}`)
  }

  public static checkOverload(): void {
    CheckHelper.showProcessId()
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
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024

    logger.info(`Core Number: ${coreNumber}`)
    logger.info(`Memory Usage: ${memoryUsage} MB`)

    if (coreNumber < 2) {
      logger.error('Core Number is too small')
    }

    // Check memory usage is too large when running in production mode
    if (memoryUsage > 1000) {
      logger.error('Memory Usage is too large')
      const message = `Memory Usage is too large: ${memoryUsage}
      Please check the server now!`
      TelegramUtil.sendToTelegram(message, undefined, false)
    } else if (memoryUsage > 500) {
      const message = `Memory Usage is too large: ${memoryUsage}`
      logger.warn(message)
      TelegramUtil.sendToTelegram(message, undefined, false)
    } else {
      logger.info('Memory Usage is normal')
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
