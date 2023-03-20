import Joi from 'joi'
import PollAnswerValidate from '@/validations/poll_answer.validate'
import PollHashtagValidation from '@/validations/poll_hashtag.validation'
import PollMentionValidation from '@/validations/poll_mention.vaildation'
import PollEntityValidation from '@/validations/poll_entity.validate'
const pollAnswerValidate = new PollAnswerValidate()
const pollHashtagValidation = new PollHashtagValidation()
const pollMentionValidation = new PollMentionValidation()
const pollEntityValidation = new PollEntityValidation()
class PollValidation {
  public create = Joi.object({
    categoryId: Joi.string().uuid(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    canAddNewAnswer: Joi.boolean(),
    anonymousPoll: Joi.boolean(),
    type: Joi.string().valid(),
    entities: Joi.array().items(pollEntityValidation.create),
    hashtags: Joi.array().items(pollHashtagValidation.create),
    answers: Joi.array().items(pollAnswerValidate.create).min(1),
    mentions: Joi.array().items(pollMentionValidation.create),
  })

  public update = Joi.object({
    categoryId: Joi.string().uuid(),
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    canAddNewAnswer: Joi.boolean(),
    anonymousPoll: Joi.boolean(),
    type: Joi.string().valid(),
    entities: Joi.array().items(pollEntityValidation.create),
    hashtags: Joi.array().items(pollHashtagValidation.update),
    answers: Joi.array().items(pollAnswerValidate.update).min(1),
    mentions: Joi.array().items(pollMentionValidation.update),
  })
}

export default PollValidation
