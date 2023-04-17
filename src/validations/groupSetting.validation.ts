import Joi from 'joi'

class GroupValidation {
  public create = Joi.object({
    setting_1: Joi.boolean(),
    setting_2: Joi.boolean(),
  })

  public update = Joi.object({
    setting_1: Joi.boolean(),
    setting_2: Joi.boolean(),
  })
}

export default GroupValidation
