import Joi from 'joi'
class ReportUserValidation {
  public create = Joi.object({
    reporterId: Joi.string().uuid().required(),
    reportedId: Joi.string().uuid().required(),
    reason: Joi.string(),
    description: Joi.string(),
  })

  public update = Joi.object({
    reason: Joi.string(),
    description: Joi.string(),
  })
}

export default ReportUserValidation
