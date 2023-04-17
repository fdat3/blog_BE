import Joi from 'joi'

class ReportPollValidation {
  public create = Joi.object({
    pollId: Joi.string().uuid().required(),
    reason: Joi.string().required(),
  })

  public update = Joi.object({
    reason: Joi.string().required(),
  })
}

export default ReportPollValidation
