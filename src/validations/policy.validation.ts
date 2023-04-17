import Joi from 'joi'

class PolicyValidation {
  public create = Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
  })

  public update = Joi.object({
    type: Joi.string(),
    name: Joi.string(),
    content: Joi.string(),
  })
}

export default PolicyValidation
