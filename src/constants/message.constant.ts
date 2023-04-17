class Message {
  public static readonly API_WORKING: string = 'API is working'

  public static readonly SOMETHING_WENT_WRONG: string = 'Something went wrong'
  public static readonly UPDATE_SUCCESSFULLY: string = 'Update successfully'
  public static readonly NOT_FOUND: string = 'Resource not found!'

  // auth
  public static readonly USERNAME_NOT_VALID: string = 'username is not valid'
  public static readonly FULLNAME_NOT_VALID: string = 'name is not valid'
  public static readonly EMAIL_NOT_VALID: string = 'email is not valid'
  public static readonly PASSWORD_NOT_VALID: string = 'password is not valid'
  public static readonly PHONE_NOT_VALID: string = 'phone is not valid'
  public static readonly ADDRESS_NOT_VALID: string = 'address is not valid'
  public static readonly USERNAME_EXIST: string = 'username is exist'
  public static readonly EMAIL_EXIST: string = 'email is exist'
  public static readonly PHONE_EXIST: string = 'phone is exist'
  public static readonly USER_NOT_CREATE: string =
    'user is not create, please try again'
  public static readonly USER_CREATE_SUCCESS: string =
    'user is create success, please login'
  public static readonly USER_NOT_FOUND: string = 'user is not found'
  public static readonly PASSWORD_NOT_MATCH: string = 'password is not match'
  public static readonly USER_LOGIN_SUCCESS: string = 'user is login success'

  // token
  public static readonly TOKEN_NOT_VALID: string = 'Token not valid'
  public static readonly TOKEN_NOT_ISSUED_FOR_THIS_DEVICE: string =
    'Token not issued for this device'
  public static readonly NOT_AUTHENTICATED: string = 'Not authenticated'
  public static readonly UNAUTHORIZED: string = 'Unauthorized'
  public static readonly NOT_ALLOWED: string = 'Not allowed'

  // user
  public static readonly USERNAME_NOT_CHANGE: string = 'username is not change'
  public static readonly USERNAME_CHANGE_SUCCESS: string =
    'username is change success'
  public static readonly NAME_NOT_CHANGE: string = 'name is not change'
  public static readonly NAME_CHANGE_SUCCESS: string = 'name is change success'
  public static readonly EMAIL_NOT_CHANGE: string = 'email is not change'
  public static readonly EMAIL_CHANGE_SUCCESS: string =
    'email is change success'
  public static readonly PASSWORD_NOT_CHANGE: string = 'password is not change'
  public static readonly PASSWORD_CHANGE_SUCCESS: string =
    'password is change success'
  public static readonly PHONE_NOT_CHANGE: string = 'phone is not change'
  public static readonly PHONE_CHANGE_SUCCESS: string =
    'phone is change success'
  public static readonly ADDRESS_NOT_CHANGE: string = 'address is not change'
  public static readonly ADDRESS_CHANGE_SUCCESS: string =
    'address is change success'
  public static readonly USER_NOT_DELETE: string =
    'user is not delete, please try again'
  public static readonly USER_DELETE_SUCCESS: string = 'user is delete success'
  public static readonly USER_FOUND: string = 'user is found'

  // Files
  public static readonly UPLOAD_IMAGE: string = 'Please upload an image!'

  // POll
  public static readonly CREATE_POLL_ERR: string =
    'Can not create new poll right now! Please try again.'
  public static readonly POLL_NOT_FOUND: string = 'Poll not found!'
  public static readonly CREATE_GROUP_ERR: string =
    'Can not create new group right now! Please try again.'
  public static readonly DELETE_POLL_ERR: string = 'Delete poll error'
  public static readonly GET_POPULARITY_POLL_ERR: string =
    'Get popularity poll error'
  public static readonly GET_MY_POLL_ERROR: string = 'Get my poll error'
  public static readonly POLL_CANNOT_UPDATE_BECAUSE_HAS_VOTES_OR_COMMENTS: string =
    'Poll cannot update because this poll has votes or comments'

  // GROUP
  public static readonly GROUP_NOT_FOUND: string = 'Group not found!'
  public static readonly GROUP_NO_AUTHORIZATION: string =
    'You have no permission to change/update this group'
  public static readonly UPDATE_GROUP_ERR: string = 'Update group error'
  public static readonly JOIN_GROUP_ERR: string = 'Join group error'
  public static readonly JOIN_GROUP_PASSWORD_REQUIRED: string =
    'Password required'
  public static readonly JOIN_GROUP_WRONG_PASSWORD: string = 'Wrong password'
  public static readonly MEMBER_ALREADY_IN_GROUP: string =
    'Some Members already in group'
  public static readonly LEAVE_GROUP_ERR: string = 'Leave group error'
  public static readonly GET_MY_PUBLIC_GROUP_ERR: string =
    'Get Public Group Error'
  public static readonly GET_MY_PRIVATE_GROUP_ERR: string =
    'Get Private Group Error'
  public static readonly GET_MY_GROUP_ERR: string = 'Get My Group Error'
  public static readonly GET_GROUP_ERR: string = 'Get Group Error'
  public static readonly GROUP_MEMBER_NOT_FOUND: string = 'Get Members error'
  public static readonly ADMIN_INVITE_MEMBERS_ERR: string =
    'Invite Members Error'
  public static readonly ADMIN_REMOVE_MEMBERS_ERR: string =
    'Remove Members Error'

  // Block
  public static readonly CREATE_BLOCK_ERR: string = 'Create Block Item Error'
  public static readonly DELETE_BLOCK_ITEM_ERR: string =
    'Delete Block Item Error'

  // Like
  public static readonly CREATE_LIKE_ERR: string = 'Create Like Item Error'
  public static readonly DELETE_LIKE_ERR: string = 'Delete Like Item Error'
  public static readonly UPDATE_LIKE_ERR: string = 'Update Like Item Error'
}
export default Message
