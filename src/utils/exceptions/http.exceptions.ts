import ErrorController from '@/controllers/error.controller'

class HttpExceptions extends Error {
  public statusCode: number

  public statusMsg: string

  public msg: string
  private error: Error | any

  constructor(
    statusCode: number,
    statusMsg: string,
    msg?: any,
    error?: Error | any,
  ) {
    super(msg)
    this.statusCode = statusCode
    this.statusMsg = statusMsg
    this.msg = msg || statusMsg
    this.error = error

    this.sendToTelegram()
  }

  private sendToTelegram(): void {
    if (
      process?.env?.NODE_ENV &&
      ['production', 'development', 'local'].includes(process.env.NODE_ENV)
    ) {
      setTimeout(() => {
        ErrorController.sendErrorToTelegram(this.error)
          .then()
          .catch((err) => {
            ErrorController.sendErrorToTelegram(err)
          })
      }, 0)
    }
  }
}

export default HttpExceptions
