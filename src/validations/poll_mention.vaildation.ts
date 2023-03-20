import Joi from 'joi'

class PollMentionValidation {
  public create = Joi.object({
    userId: Joi.string().uuid().required(),
  })

  public update = Joi.object({
    userId: Joi.string().uuid().required(),
  })
}

export default PollMentionValidation
