import Joi from 'joi'

class PollEntityValidation {
  public create = Joi.object({
    offset: Joi.number().required(),
    length: Joi.number().required(),
    type: Joi.string().valid('MENTION', 'HASHTAG').required(),
  })

  public update = Joi.object({
    offset: Joi.number().required(),
    length: Joi.number().required(),
    type: Joi.string().valid('MENTION', 'HASHTAG').required(),
  })
}

export default PollEntityValidation
