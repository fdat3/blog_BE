class Api {
  public static readonly DEFAULT_PAGE_SIZE: number = 10

  public static readonly ROOT: string = '/'

  public static readonly API: string = '/api'
  public static readonly API_V1: string = '/v1'
  public static readonly API_V2: string = '/v2'

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
  public static readonly USERS_CREATE: string = '/'
  public static readonly USER_UPDATE_ANY: string = '/:id'
  public static readonly USER_UPDATE_USERNAME: string = '/update-username/:id'
  public static readonly USER_UPDATE_FULLNAME: string = '/update-fullname/:id'
  public static readonly USER_UPDATE_DOB: string = '/update-dob/:id'
  public static readonly USER_UPDATE_NAME: string = '/update-name/:id'
  public static readonly USER_UPDATE_EMAIL: string = '/update-email/:id'
  public static readonly USER_UPDATE_PASSWORD: string = '/update-password/:id'
  public static readonly USER_UPDATE_PHONE: string = '/update-phone/:id'
  public static readonly USER_UPDATE_ADDRESS: string = '/update-address/:id'
  public static readonly USER_DELETE: string = '/delete/:id'
  public static readonly USER_GET: string = '/find/:id'
  public static readonly USER_GET_ALL: string = '/get-all'
  public static readonly USER_GET_ALL_STATS: string = '/stats'
  public static readonly USER_LOGIN: string = '/login'

  // blog
  public static readonly BLOGS: string = '/blogs'
  public static readonly BLOG_CREATE: string = '/'
  public static readonly BLOG_GET_ALL: string = '/blog'
  public static readonly BLOG_GET: string = '/blog/:id'
  public static readonly BLOG_DELETE: string = '/delete/:id'
  public static readonly BLOG_UPDATE_TITLE: string = '/update-title/:id'
  public static readonly BLOG_UPDATE_CONTENT: string = '/update-body/:id'
  public static readonly BLOG_FIND: string = '/find-blog/:keyword'

  //comment
  public static readonly COMMENTS: string = '/comments'
  public static readonly COMMENT_UPDATE: string = '/comment-title/:id'
  public static readonly COMMENT_CREATE: string = '/'
  public static readonly COMMENT_GET: string = '/comment/:id'
  public static readonly COMMENT_GET_ALL: string = '/'
  public static readonly COMMENT_DELETE: string = '/comment/:id'

  // POLL
  public static readonly POLL: string = '/polls'
  public static readonly POLL_INFO: string = '/:id'
  public static readonly POLL_CREATE: string = '/'
  public static readonly POLL_UPDATE: string = '/:id'
  public static readonly POLL_DELETE: string = '/:id'
  public static readonly POLL_POPULARITY: string = '/popularity'
  public static readonly POLL_MY_POLL: string = '/my_polls'
  public static readonly POLL_LIKE: string = '/:id/like'
  public static readonly POLL_UNLIKE: string = '/:id/unlike'
  public static readonly POLL_VOTE: string = '/:id/vote'
  public static readonly POLL_VOTE_MULTI: string = '/:id/vote/multi'

  // POLL COMMENT
  public static readonly POLL_COMMENT: string = '/poll_comments'
  public static readonly POLL_COMMENT_INFO: string = '/:id'
  public static readonly POLL_COMMENT_CREATE: string = '/'
  public static readonly POLL_COMMENT_UPDATE: string = '/:id'
  public static readonly POLL_COMMENT_DELETE: string = '/:id'
  public static readonly POLL_COMMENT_LIKE: string = '/:id/like'
  public static readonly POLL_COMMENT_UNLIKE: string = '/:id/unlike'

  // REPORT POLL
  public static readonly REPORT_POLL: string = '/report_polls'
  public static readonly REPORT_POLL_LIST: string = '/'
  public static readonly REPORT_POLL_INFO: string = '/:id'
  public static readonly REPORT_POLL_CREATE: string = '/'
  public static readonly REPORT_POLL_UPDATE: string = '/:id'
  public static readonly REPORT_POLL_DELETE: string = '/:id'

  // GROUP
  public static readonly GROUP: string = '/groups'
  public static readonly GROUP_INFO: string = '/:id'
  public static readonly GROUP_INFO_MEMBERS: string = '/:id/members'
  public static readonly GROUP_CREATE: string = '/'
  public static readonly GROUP_UPDATE: string = '/:id'
  public static readonly GROUP_JOIN: string = '/join/:id'
  public static readonly GROUP_LEAVE: string = '/leave/:id'
  public static readonly GROUP_PUBLIC: string = '/public'

  // GROUP SETTINGS
  public static readonly GROUP_SETTING: string = '/group/settings'
  public static readonly GROUP_SETTING_GET: string = '/:id'
  public static readonly GROUP_SETTING_UPDATE: string = '/:id'

  // LIKE
  public static readonly LIKE: string = '/likes'
  public static readonly LIKE_CREATE: string = '/'
  public static readonly LIKE_DELETE: string = '/:id'

  // UPVOTE
  public static readonly VOTE: string = '/votes'
  public static readonly VOTE_CREATE: string = '/'
  public static readonly VOTE_DELETE: string = '/:id'
  public static readonly VOTE_UPDATE: string = '/:id'
  public static readonly FIND_VOTE_BY_BLOG_ID: string = '/:id'
  public static readonly FIND_VOTE_BY_ID: string = '/:id'
  public static readonly GET_ALL_VOTES: string = '/get-all-votes'

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

  // Transaction
  public static readonly TRANSACTION: string = '/transactions'
  public static readonly TRANSACTION_LIST: string = '/'
  public static readonly TRANSACTION_INFO: string = '/:id'

  // Poll Up Package
  public static readonly POLL_UP_PACKAGE: string = '/poll_up_packages'
  public static readonly POLL_UP_PACKAGE_LIST: string = '/'
  public static readonly POLL_UP_PACKAGE_INFO: string = '/:id'
  public static readonly POLL_UP_PACKAGE_CREATE: string = '/'
  public static readonly POLL_UP_PACKAGE_UPDATE: string = '/:id'
  public static readonly POLL_UP_PACKAGE_DELETE: string = '/:id'
  public static readonly POLL_UP_PACKAGE_ACTIVE: string = '/:id/active'
  public static readonly POLL_UP_PACKAGE_INACTIVE: string = '/:id/inactive'

  // Admin
  public static readonly ADMIN: string = '/admin'

  public static readonly ADMIN_USER: string = '/users'
  public static readonly ADMIN_USER_ITEM: string = '/:id'
  public static readonly ADMIN_USER_ADD: string = '/add'
  public static readonly ADMIN_USER_EDIT: string = '/edit/:id'
  public static readonly ADMIN_USER_DELETE: string = '/delete/:id'

  public static readonly ADMIN_POLL: string = '/polls'

  public static readonly ADMIN_POLL_CATEGORY: string = '/poll_category'
  public static readonly ADMIN_POLL_CATEGORY_ITEM: string = '/:id'
  public static readonly ADMIN_POLL_CATEGORY_ADD: string = '/add'
  public static readonly ADMIN_POLL_CATEGORY_EDIT: string = '/edit/:id'
  public static readonly ADMIN_POLL_CATEGORY_DELETE: string = '/delete/:id'

  public static readonly ADMIN_GROUP: string = '/groups'
  public static readonly ADMIN_GROUP_INVITE_MEMBERS: string = '/invite-members'
  public static readonly ADMIN_GROUP_REMOVE_MEMBERS: string = '/remove-members'

  // Policy
  public static readonly POLICY: string = '/policy'
  public static readonly POLICY_INFO: string = '/:id'
  public static readonly POLICY_UPDATE: string = '/:id'
  public static readonly POLICY_DELETE: string = '/:id'

  // REPORT USER
  public static readonly REPORT_USER: string = '/report_users'
  public static readonly REPORT_USER_UPDATE: string = '/:id'
  public static readonly REPORT_USER_INFO: string = '/:id'
  public static readonly REPORT_USER_DELETE: string = '/:id'
}

export default Api
