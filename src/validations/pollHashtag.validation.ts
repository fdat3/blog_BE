import Joi from 'joi'
import HashtagValidate from '@/validations/hashtag.validation'

const hashtagValidate = new HashtagValidate()
class PollHashtagValidation {
  public create = Joi.object({
    hashtag: hashtagValidate.create,
  })

  public update = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  })
}

export default PollHashtagValidation
