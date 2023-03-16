import mongoose from 'mongoose'

import ConstantModel from '@/constants/model.mongo.constant'
import TelegramSchema from '@/schemas/telegram.schema'
import TelegramInterface from '@/interfaces/telegram.interface'

const TelegramModel = mongoose.model<TelegramInterface>(
  ConstantModel.USER_MODEL,
  TelegramSchema,
)

export default TelegramModel
