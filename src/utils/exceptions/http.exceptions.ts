import ErrorController from '@/controllers/error.controller'

class HttpExceptions extends Error {
  public statusCode: number

  public statusMsg: string

  public msg: string
  private readonly error: Error | any

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

    this.sendToTelegram(this.error)
  }

  private sendToTelegram(err: Error | any): void {
    if (
      process?.env?.NODE_ENV &&
      ['production', 'development', 'local'].includes(process.env.NODE_ENV)
    ) {
      setTimeout(() => {
        ErrorController.sendErrorToTelegram(err)
          .then()
          .catch((error) => {
            this.sendToTelegram(error)
          })
      }, 0)
    }
  }
}

export default HttpExceptions
