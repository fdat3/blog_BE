class Api {
  public static readonly DEFAULT_PAGE_SIZE: number = 10

  public static readonly ROOT: string = '/'

  public static readonly API: string = '/api'

  public static readonly HOOK: string = '/hook'
  public static readonly IMAGE: string = '/images'
  public static readonly IMAGE_UPLOAD: string = '/upload'
  public static readonly IMAGE_UPLOAD_RESIZE: string = '/upload/:size'
  public static readonly IMAGE_UPLOAD_MULTIPLE: string = '/upload/multiple'
  public static readonly IMAGE_UPLOAD_MULTIPLE_RESIZE: string =
    '/upload/multiple/:thumbnail_size/:size'

  // auth
  public static readonly AUTH: string = '/auth'
  public static readonly AUTH_REGISTER: string = '/register'
  public static readonly AUTH_LOGIN: string = '/login'
  public static readonly AUTH_KAKAO: string = '/kakao'
  public static readonly AUTH_NAVER: string = '/naver'
  public static readonly AUTH_FACEBOOK: string = '/facebook'
  public static readonly AUTH_GOOGLE: string = '/google'
  public static readonly AUTH_APPLE: string = '/apple'

  // users
  public static readonly USERS: string = '/users'
  public static readonly USER_UPDATE_ANY: string = '/:id'
  public static readonly USER_UPDATE_USERNAME: string = '/update-username/:id'
  public static readonly USER_UPDATE_NAME: string = '/update-name/:id'
  public static readonly USER_UPDATE_EMAIL: string = '/update-email/:id'
  public static readonly USER_UPDATE_PASSWORD: string = '/update-password/:id'
  public static readonly USER_UPDATE_PHONE: string = '/update-phone/:id'
  public static readonly USER_UPDATE_ADDRESS: string = '/update-address/:id'
  public static readonly USER_DELETE: string = '/delete/:id'
  public static readonly USER_GET: string = '/find/:id'
  public static readonly USER_GET_ALL: string = '/'
  public static readonly USER_GET_ALL_STATS: string = '/stats'

  // POLL
  public static readonly POLL: string = '/polls'
  public static readonly POLL_INFO: string = '/:id'
  public static readonly POLL_CREATE: string = '/'
  public static readonly POLL_UPDATE: string = '/:id'

  // GROUP
  public static readonly GROUP: string = '/groups'
  public static readonly GROUP_INFO: string = '/:id'
  public static readonly GROUP_CREATE: string = '/'
  public static readonly GROUP_UPDATE: string = '/:id'
  public static readonly GROUP_JOIN: string = '/join/:id'
  public static readonly GROUP_LEAVE: string = '/leave/:id'

  // GROUP SETTINGS
  public static readonly GROUP_SETTING: string = '/group/settings'
  public static readonly GROUP_SETTING_GET: string = '/:id'
  public static readonly GROUP_SETTING_UPDATE: string = '/:id'

  // Follow
  public static readonly FOLLOW: string = '/follows'
  public static readonly FOLLOW_FOLLOWED: string = '/followed'
  public static readonly FOLLOW_FOLLOWING: string = '/following'
  public static readonly FOLLOW_ADD: string = '/add'
  public static readonly FOLLOW_REMOVE: string = '/remove'
  public static readonly FOLLOW_BACK: string = '/follow-back'

  // Block
  public static readonly BLOCK: string = '/block'
  public static readonly BLOCK_GET: string = '/:id'
  public static readonly BLOCK_CREATE: string = '/'
  public static readonly BLOCK_DELETE: string = '/'

  // Device
  public static readonly DEVICE: string = '/devices'
  public static readonly DEVICE_LIST: string = '/:deviceId'
  public static readonly DEVICE_DELETE: string = '/:id'
}

export default Api
