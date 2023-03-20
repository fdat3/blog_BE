import Joi from 'joi'

class PollAnswerValidate {
  public create = Joi.object({
    content: Joi.string().required(),
    image: Joi.string(),
    coord: Joi.string(),
  })

  public update = Joi.object({
    content: Joi.string(),
    image: Joi.string(),
    coord: Joi.string(),
  })
}

export default PollAnswerValidate
