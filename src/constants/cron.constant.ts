class CronConstant {
  public static readonly EVERY_DAY_AT_00_00 = '0 0 * * *'
  public static readonly EVERY_DAY_AT_00_00_UTC = '0 0 * * * UTC'
  public static readonly EVERY_1_MINUTE = '*/1 * * * *'
  public static readonly EVERY_5_MINUTES = '*/5 * * * *'
  public static readonly EVERY_5_MINUTES_UTC = '*/5 * * * * UTC'
  public static readonly EVERY_30_MINUTES = '*/30 * * * *'
  public static readonly EVERY_30_MINUTES_UTC = '*/30 * * * * UTC'
  public static readonly EVERY_1_HOUR = '0 */1 * * *'
  public static readonly EVERY_1_HOUR_UTC = '0 */1 * * * UTC'
  public static readonly EVERY_6_HOURS = '0 */6 * * *'
  public static readonly EVERY_6_HOURS_UTC = '0 */6 * * * UTC'
  public static readonly EVERY_12_HOURS = '0 */12 * * *'
  public static readonly EVERY_12_HOURS_UTC = '0 */12 * * * UTC'
  public static readonly EVERY_1_DAY = '0 0 */1 * *'
  public static readonly EVERY_1_DAY_UTC = '0 0 */1 * * UTC'
  public static readonly EACH_3_DAYS = '0 0 */3 * *'
  public static readonly EACH_3_DAYS_UTC = '0 0 */3 * * UTC'
}

export default CronConstant
