import Joi from 'joi'

class BlogValidation {
  public createBlog = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().min(50).required(),
    hashtag: Joi.string(),
  })
}

export default BlogValidation
