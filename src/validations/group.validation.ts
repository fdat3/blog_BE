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

  public inviteMembers = Joi.object({
    groupId: Joi.string().uuid().required(),
    members: Joi.array()
      .items(
        Joi.object({
          userId: Joi.string().uuid().required(),
          role: Joi.string().required(),
        }),
      )
      .min(1)
      .required(),
  })

  public removeMembers = Joi.object({
    members: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().uuid().required(),
          reason: Joi.string(),
        }),
      )
      .min(1)
      .required(),
  })
}

export default GroupValidation
