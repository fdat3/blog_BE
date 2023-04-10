import Number from '@/constants/number.constant'

class NumberUtils {
  static randomIntToGetPopularityPolls(
    min: number = Number.MIN_POPULARITY_POLLS,
    max: number = Number.MAX_POPULARITY_POLLS,
  ): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

export default NumberUtils
