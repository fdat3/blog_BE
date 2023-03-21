import Joi from 'joi'
import GroupSettingValidation from '@/validations/group_setting.validation'
const groupSettingValidation = new GroupSettingValidation()
class GroupValidation {
  public create = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
    isVisible: Joi.boolean(),
    isPrivate: Joi.boolean(),
    settings: groupSettingValidation.create,
  })

  public update = Joi.object({
    name: Joi.string(),
    password: Joi.string(),
    avatar: Joi.string(),
    isVisible: Joi.boolean(),
    isPrivate: Joi.boolean(),
    settings: groupSettingValidation.update,
  })
}

export default GroupValidation
