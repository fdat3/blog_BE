import Joi from 'joi'

class LikeValidation {
  public create = Joi.object({
    pollId: Joi.string().uuid(),
    pollCommentId: Joi.string().uuid(),
  })

  public update = Joi.object({
    pollId: Joi.string().uuid(),
    pollCommentId: Joi.string().uuid(),
  })
}

export default LikeValidation
