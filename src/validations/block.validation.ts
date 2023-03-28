import Joi from 'joi'

class BlockValidation {
  public create = Joi.object({
    blockedId: Joi.string().uuid().required(),
  })

  public delete = Joi.object({
    blockedId: Joi.string().uuid().required(),
  })
}

export default BlockValidation
