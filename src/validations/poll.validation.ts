import Joi from 'joi'
import PollAnswerValidate from '@/validations/poll_answer.validate'
const pollAnswerValidate = new PollAnswerValidate()
class PollValidation {
  public create = Joi.object({
    categoryId: Joi.string().uuid(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    canAddNewAnswer: Joi.boolean(),
    anonymousPoll: Joi.boolean(),
    type: Joi.string().valid(),
    answers: Joi.array().items(pollAnswerValidate.create).min(1),
  })

  public update = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  })
}

export default PollValidation
