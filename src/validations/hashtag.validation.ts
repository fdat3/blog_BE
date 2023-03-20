import Joi from 'joi'

class HashtagValidate {
  public create = Joi.object({
    name: Joi.string().required(),
  })

  public update = Joi.object({
    name: Joi.string().required(),
  })
}

export default HashtagValidate
