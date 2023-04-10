import schedule from 'node-schedule'
import PollRepository from '@/repositories/poll.repository'
import CronConstant from '@/constants/cron.constant'
import logger from '@/utils/logger.util'

class CronService {
  constructor() {
    logger.info('CronService initialized')
    // this.scheduleJobEveryMinute()
    this.scheduleJobEveryDay()
    this.scheduleJobEveryHour()
  }

  private scheduleJobEveryDay(): void {
    logger.info('scheduleJobEveryDay initialized')
    schedule.scheduleJob(CronConstant.EVERY_DAY_AT_00_00, async () => {
      await PollRepository.getPopularityPolls()
    })
  }

  private scheduleJobEveryMinute(): void {
    logger.info('scheduleJobEveryMinute initialized')
    schedule.scheduleJob(CronConstant.EVERY_1_MINUTE, async () => {
      await PollRepository.getPopularityPolls()
    })
  }

  private scheduleJobEveryHour(): void {
    logger.info('scheduleJobEveryHour initialized')
    schedule.scheduleJob(CronConstant.EVERY_1_HOUR, async () => {
      await PollRepository.getPopularityPolls()
    })
  }
}

export default CronService
