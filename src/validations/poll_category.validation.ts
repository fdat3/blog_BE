import Joi from 'joi'
import HashtagValidate from './hashtag.validation'

const hashtagValidate = new HashtagValidate()
class PollCategoryValidate {
  public create = Joi.object({
    label: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    hashtags: Joi.array().items(hashtagValidate.create),
  })

  public update = Joi.object({
    label: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    hashtags: Joi.array().items(hashtagValidate.update),
  })
}

export default PollCategoryValidate
