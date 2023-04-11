import schedule from 'node-schedule'
import PollRepository from '@/repositories/poll.repository'
import CronConstant from '@/constants/cron.constant'
import logger from '@/utils/logger.util'

class CronService {
  constructor() {
    logger.info('CronService initialized')
    // Run all functions below
    this.scheduleJobEveryDay()
    // this.scheduleJobEveryMinute()
    this.scheduleJobEveryHour()
    this.scheduleJobEvery3Days()
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

  private scheduleJobEvery3Days(): void {
    logger.info('scheduleJobEvery3Days initialized')
    schedule.scheduleJob(CronConstant.EACH_3_DAYS, async () => {
      await PollRepository.getPopularityPolls()
    })
  }
}

export default CronService
