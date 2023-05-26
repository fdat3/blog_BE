import Joi from 'joi'

class BlogValidation {
  public createBlog = Joi.object({
    title: Joi.string().max(30).required(),
    subTitle: Joi.string().max(30).required(),
    body: Joi.string().min(50).required(),
  })
}

export default BlogValidation
