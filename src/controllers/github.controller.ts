import { NextFunction, Request, Response, Router } from 'express'
import Controller from '@/interfaces/controller.interface'

import HttpException from '@/utils/exceptions/http.exceptions'

// api constant
import ConstantAPI from '@/constants/api.constant'

// message constant
// http constant
import ConstantHttpCode from '@/constants/http.code.constant'
import ConstantHttpReason from '@/constants/http.reason.constant'

// logger
import { GithubHookInterface } from '@/interfaces/github.hook.interface'
import axios, { AxiosResponse } from 'axios'

const { GithubWebhook } = require('@inventivetalent/express-github-webhook')

class GithubHookController implements Controller {
  public path: string
  public router: Router
  private webhookHandler: typeof GithubWebhook
  private BASE_URL: string
  private ROOM: string

  constructor() {
    this.path = ConstantAPI.HOOK
    this.BASE_URL = ''
    this.ROOM = ''
    this.router = Router()
    this.webhookHandler = new GithubWebhook({
      // events: ['push', 'workflow_run', 'workflow_job', 'in_progress', 'completed'],
      secret: 'ecc',
    })

    this.initialiseRoutes()
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.getHook)
    this.router.post(`${this.path}`, this.receiveHook)
  }

  private getHook = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      console.log('hello')
      return res.json({
        message: 'test',
      })
    } catch (err: any) {
      return next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err.message,
        ),
      )
    }
  }

  private receiveHook = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { body } = req
      await this.sendToTelegram(body)

      return res.json({
        status: 'success',
        message: 'Sent to telegram message',
      })
    } catch (err: any) {
      return next(
        new HttpException(
          ConstantHttpCode.INTERNAL_SERVER_ERROR,
          ConstantHttpReason.INTERNAL_SERVER_ERROR,
          err.message,
        ),
      )
    }
  }

  private sendToTelegram = async (
    data: GithubHookInterface,
  ): Promise<Response | any> => {
    const url: string = this.BASE_URL
    // filtering necessary keys in object
    const { action, workflow_job, repository } = data

    const new_repository = {
      full_name: repository?.full_name,
      html_url: repository?.html_url,
      private: repository?.private,
    }

    const body = {
      chat_id: this.ROOM,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      allow_sending_without_reply: true,
      text: `<b>Action ${action.toUpperCase()}</b>

Workflow name: ${workflow_job?.workflow_name}
Workflow url: ${workflow_job?.html_url}
Created At: ${workflow_job?.created_at}
Completed At: ${workflow_job?.completed_at}

Repository: ${new_repository.full_name}
url: <a>${new_repository.html_url}</a>`,
    }

    try {
      const res: AxiosResponse = await axios.post(url, body)
      return res.data
    } catch (err: any) {
      console.log(err)
      console.log(err.message)
    }
  }
}

export default GithubHookController
