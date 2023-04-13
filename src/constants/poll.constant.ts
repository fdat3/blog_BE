import RedisTTLConstant from '@/constants/redis.ttl.constant'

class PollConstant {
  public static readonly POPULARITY_POLL_TTL: number =
    RedisTTLConstant.ONE_DAY * 3 // 3 days
  public static readonly POLL_UP_PACKAGE_TTL: number = RedisTTLConstant.ONE_DAY
}

export default PollConstant
