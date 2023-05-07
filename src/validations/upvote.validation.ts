import Joi from 'joi'

class UpVote {
  public create = Joi.object({
    userId: Joi.number().required(),
    blogId: Joi.number().required(),
  })

  public update = Joi.object({
    userId: Joi.number().required(),
    blogId: Joi.number().required(),
  })
}

export default UpVote
