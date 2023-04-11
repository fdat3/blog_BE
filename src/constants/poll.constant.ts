import RedisTTLConstant from '@/constants/redis.ttl.constant'

class PollConstant {
  public static readonly POPULARITY_POLL_TTL: number =
    RedisTTLConstant.ONE_DAY * 3
}

export default PollConstant
