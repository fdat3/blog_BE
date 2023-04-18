import Joi from 'joi'
import { EReportType } from '@/models/pg/ReportPoll'
class ReportPollValidation {
  public create = Joi.object({
    pollId: Joi.string().uuid().required(),
    reason_type: Joi.string()
      .valid(EReportType as Record<string, string>)
      .required(),
    description: Joi.string().required(),
  })

  public update = Joi.object({
    description: Joi.string().required(),
  })
}

export default ReportPollValidation
