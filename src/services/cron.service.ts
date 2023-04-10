import schedule from 'node-schedule'
import PollRepository from '@/repositories/poll.repository'
import CronConstant from '@/constants/cron.constant'
import logger from '@/utils/logger.util'

class CronService {
  constructor() {
    logger.info('CronService initialized')
    // this.scheduleJobEveryMinute()
    this.scheduleJobEveryDay()
  }

  private scheduleJobEveryDay(): void {
    logger.info('scheduleJobEveryDay initialized')
    schedule.scheduleJob(CronConstant.EVERY_DAY_AT_00_00, async () => {
      await PollRepository.getPopularityPolls()
    })
  }

  private scheduleJobEveryMinute(): void {
    logger.info('scheduleJobEveryMinute initialized')
    schedule.scheduleJob(CronConstant.EVERY_1_MINUTE, async () => {})
  }
}

export default CronService
