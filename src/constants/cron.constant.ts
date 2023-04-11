class CronConstant {
  public static readonly EVERY_DAY_AT_00_00: string = '0 0 * * *'
  public static readonly EVERY_DAY_AT_00_00_UTC: string = '0 0 * * * UTC'
  public static readonly EVERY_1_MINUTE: string = '*/1 * * * *'
  public static readonly EVERY_5_MINUTES: string = '*/5 * * * *'
  public static readonly EVERY_5_MINUTES_UTC: string = '*/5 * * * * UTC'
  public static readonly EVERY_30_MINUTES: string = '*/30 * * * *'
  public static readonly EVERY_30_MINUTES_UTC: string = '*/30 * * * * UTC'
  public static readonly EVERY_1_HOUR: string = '0 */1 * * *'
  public static readonly EVERY_1_HOUR_UTC: string = '0 */1 * * * UTC'
  public static readonly EVERY_6_HOURS: string = '0 */6 * * *'
  public static readonly EVERY_6_HOURS_UTC: string = '0 */6 * * * UTC'
  public static readonly EVERY_12_HOURS: string = '0 */12 * * *'
  public static readonly EVERY_12_HOURS_UTC: string = '0 */12 * * * UTC'
  public static readonly EVERY_1_DAY: string = '0 0 */1 * *'
  public static readonly EVERY_1_DAY_UTC: string = '0 0 */1 * * UTC'
  public static readonly EACH_3_DAYS: string = '0 0 */3 * *'
  public static readonly EACH_3_DAYS_UTC: string = '0 0 */3 * * UTC'
}

export default CronConstant
