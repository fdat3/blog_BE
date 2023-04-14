import NumberConstant from '@/constants/number.constant'
class FirebaseUtils {
  public static chunkTokenArray(
    array: any[],
    chunkSize: number = NumberConstant.FIREBASE_DEFAULT_CHUNK_SIZE,
  ): any[] {
    const chunkedArray = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize))
    }
    return chunkedArray
  }
}

export default FirebaseUtils
