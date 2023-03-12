import Joi from 'joi'
import ConstantRegex from '@/constants/regex.constant'

class MbtiValidation {
  public create = Joi.object({
    label: Joi.string().min(1).max(20).required(),
  })

  public update = Joi.object({
    label: Joi.string().min(1).max(20).required(),
  })

  public labelValidate(label: string): boolean {
    return ConstantRegex.MBTI_LABEL.test(label)
  }
}

export default MbtiValidation
