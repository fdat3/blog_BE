import Joi from 'joi'

class GroupValidation {
  public create = Joi.object({
    setting1: Joi.boolean().required(),
    setting2: Joi.boolean().required(),
  })

  public update = Joi.object({
    setting1: Joi.boolean(),
    setting2: Joi.boolean(),
  })
}

export default GroupValidation
