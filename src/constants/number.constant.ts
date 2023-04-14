class Number {
  // user
  public static readonly USERNAME_MIN_LENGTH: number = 3
  public static readonly USERNAME_MAX_LENGTH: number = 20
  public static readonly NAME_MIN_LENGTH: number = 3
  public static readonly NAME_MAX_LENGTH: number = 80
  public static readonly EMAIL_MAX_LENGTH: number = 50
  public static readonly PASSWORD_MIN_LENGTH: number = 8
  public static readonly PHONE_MIN_LENGTH: number = 10
  public static readonly PHONE_MAX_LENGTH: number = 20
  public static readonly ADDRESS_MIN_LENGTH: number = 10
  public static readonly ADDRESS_MAX_LENGTH: number = 200
  public static readonly DEFAULT_LENGTH: number = 6
  public static readonly MIN_POPULARITY_POLLS: number = 3
  public static readonly MAX_POPULARITY_POLLS: number = 5

  // Firebase
  public static readonly FIREBASE_MULTICAST_LIMIT: number = 500
  public static readonly FIREBASE_MULTICAST_DELAY: number = 1000
  public static readonly FIREBASE_DEFAULT_CHUNK_SIZE: number = 500

  // Check Helper
  public static readonly HELPER_INTERVAL_CHECK_OVERLOAD: number = 1000 * 60 * 5 // 5 minutes
}

export default Number
