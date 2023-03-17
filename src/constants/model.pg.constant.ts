class PgModel {
  public static readonly USER: string = 'users'
  public static readonly USER_SETTING: string = 'user_settings'
  public static readonly USER_POINTS: string = 'user_points'
  public static readonly USER_POINT_HISTORY: string = 'user_point_histories'
  public static readonly FOLLOW: string = 'follows'
  public static readonly POLL: string = 'polls'
  public static readonly POLL_ANSWER: string = 'poll_answers'
  public static readonly POLL_ANSWER_CHOSEN: string = 'poll_answer_chosens'
  public static readonly POLL_COMMENT: string = 'poll_comments'
  public static readonly POLL_CATEGORY_MODEL: string = 'poll_categories'
  public static readonly USER_DEVICE: string = 'user_devices'
  public static readonly BLOCK: string = 'blocks'
  public static readonly REPORT_USER: string = 'report_users'
  public static readonly REPORT_POLL: string = 'report_polls'
  public static readonly HASHTAG: string = 'hashtags'
  public static readonly POLL_HASHTAG: string = 'poll_hashtags'
  public static readonly POLL_MENTION: string = 'poll_mentions'
  public static readonly POLL_COMMENT_MENTION: string = 'poll_comment_mentions'
  public static readonly POLL_COMMENT_HASHTAG: string = 'poll_comment_hashtags'
  public static readonly SESSION: string = 'sessions'
  public static readonly LIKES: string = 'likes'
  public static readonly GROUP: string = 'groups'
  public static readonly GROUP_SETTINGS: string = 'group_settings'
  public static readonly GROUP_MEMBERS: string = 'group_members'
  public static readonly GROUP_MEMBERS_SETTING: string = 'group_member_settings'
}

export default PgModel
