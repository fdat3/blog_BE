import Joi from 'joi'

class FollowValidation {
  public create = Joi.object({
    followedId: Joi.string().uuid().required(),
  })

  public delete = Joi.object({
    followedId: Joi.string().uuid().required(),
  })
}

export default FollowValidation
