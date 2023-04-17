import Joi from 'joi'

class PollCommentValidation {
  public create = Joi.object({
    content: Joi.string().required(),
    image: Joi.string(),
    parentId: Joi.string().uuid(),
  })

  public update = Joi.object({
    content: Joi.string().required(),
    image: Joi.string(),
  })
}

export default PollCommentValidation
