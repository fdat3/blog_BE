import UserModel from './user.pg.model'
import PostModel from './post.pg.model'
import PostCategoryModel from './post_category.pg.model'
import PostCommentModel from './post_comment.pg.model'
import PostMetaModel from './post_meta.pg.model'
import PostTagModel from './post_tag.pg.model'
import TagModel from './tag.pg.model'


const User = UserModel.initModel()
const Post = PostModel.initModel()
const PostCategory = PostCategoryModel.initModel()
const PostComment = PostCommentModel.initModel()
const PostMeta = PostMetaModel.initModel()
const PostTag = PostTagModel.initModel()
const Tag = TagModel.initModel()

export {
  UserModel,
  PostModel,
  PostCategoryModel,
  PostCommentModel,
  PostMetaModel,
  PostTagModel,
  TagModel,
  User,
  Post,
  PostCategory,
  PostComment,
  PostMeta,
  PostTag,
  Tag
}