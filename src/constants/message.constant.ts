class Message {
  public static readonly API_WORKING: string = 'API is working'

  public static readonly SOMETHING_WENT_WRONG: string = 'Something went wrong'
  public static readonly UPDATE_SUCCESSFULLY: string = 'Update successfully'
  public static readonly NOT_FOUND: string = 'Resource not found!'
  public static readonly DELETE_RESOURCE_NOT_AUTHORIZE: string =
    'You are not authorized to delete this resource'

  // auth
  public static readonly USERNAME_NOT_VALID: string = 'username is not valid'
  public static readonly FULLNAME_NOT_VALID: string = 'fullname is not valid'
  public static readonly EMAIL_NOT_VALID: string = 'email is not valid'
  public static readonly PASSWORD_NOT_VALID: string = 'password is not valid'
  public static readonly PHONE_NOT_VALID: string = 'phone is not valid'
  public static readonly ADDRESS_NOT_VALID: string = 'address is not valid'
  public static readonly USERNAME_EXIST: string = 'username is exist'
  public static readonly EMAIL_EXIST: string = 'email is exist'
  public static readonly PHONE_EXIST: string = 'phone is exist'
  public static readonly USER_NOT_CREATE: string =
    'user is not create, please try again'
  public static readonly BLOG_NOT_CREATE: string =
    'blog is not create, please try again'
  public static readonly UPVOTE_NOT_CREATE: string =
    'blog is not create, please try again'
  public static readonly USER_WAS_UPVOTE: string =
    'user was vote, please change type'
  public static readonly DOWNVOTE_NOT_CREATE: string =
    'downvote is not create, please try again'
  public static readonly COMMENT_NOT_CREATE: string =
    'comment is not create, please try again'
  public static readonly USER_CREATE_SUCCESS: string =
    'user is create success, please login'
  public static readonly BLOG_CREATE_SUCCESS: string = 'blog is create success'
  public static readonly COMMENT_CREATE_SUCCESS: string =
    'comment is create success'
  public static readonly UPVOTE_CREATE_SUCCESS: string =
    'upvote this post is create success'
  public static readonly UPVOTE_DELETE_SUCCESS: string =
    'upvote this post is delete success'
  public static readonly DOWNVOTE_CREATE_SUCCESS: string =
    'downvote this post is create success'
  public static readonly USER_NOT_FOUND: string = 'user is not found'
  public static readonly BLOG_NOT_FOUND: string = 'blog is not found'
  public static readonly COMMENT_NOT_FOUND: string = 'comment is not found'
  public static readonly COMMENT_FOUND: string = 'comment found'
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
  public static readonly FULLNAME_NOT_CHANGE: string = 'fullname is not change'
  public static readonly FULLNAME_CHANGE_SUCCESS: string =
    'fullname is change success'
  public static readonly NAME_NOT_CHANGE: string = 'name is not change'
  public static readonly NAME_CHANGE_SUCCESS: string = 'name is change success'
  public static readonly BLOG_TITLE_NOT_CHANGE: string = 'blog is not change'
  public static readonly BLOG_TITLE_CHANGE_SUCCESS: string =
    'blog title is change success'
  public static readonly BLOG_CONTENT_NOT_CHANGE: string =
    'blog content is not change'
  public static readonly BLOG_CONTENT_CHANGE_SUCCESS: string =
    'blog content is change success'
  public static readonly COMMENT_CONTENT_NOT_CHANGE: string =
    'blog is not change'
  public static readonly COMMENT_CONTENT_CHANGE_SUCCESS: string =
    'blog title is change success'
  public static readonly EMAIL_NOT_CHANGE: string = 'email is not change'
  public static readonly EMAIL_CHANGE_SUCCESS: string =
    'email is change success'
  public static readonly DOB_CHANGE_SUCCESS: string = 'D.O.B is change success'
  public static readonly DOB_NOT_CHANGE: string = 'D.O.B is not change'
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

  // BLOG
  public static readonly BLOG_NOT_DELETE: string =
    'blog is not delete, please try again'
  public static readonly BLOG_DELETE_SUCCESS: string = 'blog is delete success'
  public static readonly BLOG_FOUND: string = 'blog is found'
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
  public static readonly POLL_LIKE_ERR: string = 'Poll like error'
  public static readonly POLL_VOTE_ERR: string = 'Poll vote error'
  public static readonly POLL_VOTE_ACTION_NOT_FOUND: string =
    'Poll vote action not found'

  // POLL COMMENT
  public static readonly CREATE_POLL_COMMENT_ERR: string =
    'Create poll comment error'
  public static readonly DELETE_POLL_COMMENT_ERR: string =
    'Delete poll comment error'
  public static readonly UPDATE_POLL_COMMENT_ERR: string =
    'Update poll comment error'
  public static readonly POLL_COMMENT_NOT_FOUND: string =
    'Poll comment not found!'
  public static readonly LIKE_POLL_COMMENT_ERR: string = 'Poll comment like err'
  public static readonly UNLIKE_POLL_COMMENT_ERR: string =
    'Poll comment unlike err'

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

  // UPVOTE
  public static readonly CREATE_UPVOTE_ERR: string = 'Create Upvote Item Error'
  public static readonly DELETE_UPVOTE_ERR: string = 'Delete Upvote Item Error'
  public static readonly UPDATE_UPVOTE_ERR: string = 'Update Upvote Item Error'
  public static readonly UPDATE_UPVOTE_SUCCESS: string =
    'Update Upvote Item Success'
  public static readonly UPVOTE_NOT_FOUND: string = 'Upvote not found'

  //Policy
  public static readonly POLICY_NOT_FOUND: string = 'Policy not found'
  public static readonly CREATE_POLICY_ERR: string = 'Create policy Item Error'
  public static readonly DELETE_POLICY_ERR: string = 'Delete policy Item Error'
  public static readonly UPDATE_POLICY_ERR: string = 'Update policy Item Error'

  // Report User
  public static readonly REPORT_NOT_FOUND: string = 'Report not found'
  public static readonly CREATE_REPORT_USER_ERR: string =
    'Create report user Item Error'
  public static readonly DELETE_REPORT_USER_ERR: string =
    'Delete report user Item Error'
  public static readonly UPDATE_REPORT_USER_ERR: string =
    'Update report user Item Error'
}
export default Message
