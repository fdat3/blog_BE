import Joi from 'joi'

class CommentValidation {
  public createComment = Joi.object({
    content: Joi.string().required(),
  })
}

export default CommentValidation
