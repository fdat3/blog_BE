import 'dotenv/config'

import VariableValidate from '@/validations/variable.validation'
import dotenv from 'dotenv'
import * as process from 'process'
import logger from '@/utils/logger.util'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
dotenv.config({ path: `.env.local`, override: true })

class Variable {
  public static readonly NODE_ENV: string = process.env.NODE_ENV!

  public static readonly PORT: number = Number(process.env.PORT)!
  public static readonly SOCKET_PORT: number = Number(process.env.SOCKET_PORT)!

  public static readonly MONGO_DATABASE_URL: string =
    process.env.MONGO_DATABASE_URL!

  public static readonly JWT_SECRET: string = process.env.JWT_SECRET!

  public static readonly PASS_SECRET: string = process.env.PASS_SECRET!

  public static readonly POSTGRES_DATABASE_URL: string =
    process.env.POSTGRES_DATABASE_URL!

  public static readonly POSTGRES_DATABASE_NAME: string =
    process.env.POSTGRES_DATABASE_NAME!

  public static readonly POSTGRES_DATABASE_USERNAME: string =
    process.env.POSTGRES_DATABASE_USERNAME!

  public static readonly POSTGRES_DATABASE_PASSWORD: string =
    process.env.POSTGRES_DATABASE_PASSWORD!

  public static readonly SESSION_SECRET: string = process.env.SESSION_SECRET!

  public static readonly SESSION_NAME: string = process.env.SESSION_NAME!

  public static readonly SESSION_KEYS: string = process.env.SESSION_KEYS!

  public static readonly SESSION_MAX_AGE: number = Number(
    process.env.SESSION_MAX_AGE!,
  )!

  // public static readonly SESSION_COOKIE: string = process.env.SESSION_COOKIE!;
  //
  // public static readonly SESSION_HTTP_ONLY: string = process.env.SESSION_HTTP_ONLY!;
  //
  // public static readonly SESSION_SECURE: string = process.env.SESSION_SECURE!;
  //
  // public static readonly SESSION_SAME_SITE: string = process.env.SESSION_SAME_SITE!;
  //
  // public static readonly SESSION_PATH: string = process.env.SESSION_PATH!;
  //
  // public static readonly SESSION_DOMAIN: string = process.env.SESSION_DOMAIN!;
  //
  // public static readonly SESSION_EXPIRES: string = process.env.SESSION_EXPIRES!;
  //
  // public static readonly SESSION_SIGNED: string = process.env.SESSION_SIGNED!;
  //
  // public static readonly SESSION_ROLLING: string = process.env.SESSION_ROLLING!;
  //
  public static readonly SESSION_RESAVE: boolean = Boolean(
    process.env.SESSION_RESAVE!,
  )!

  public static readonly TELEGRAM_URL: string = process.env.TELEGRAM_URL!
  public static readonly TELEGRAM_ROOM: string = process.env.TELEGRAM_ROOM!
  public static readonly TELEGRAM_THREAD_ID: string | undefined =
    process.env.TELEGRAM_THREAD_ID || undefined

  //
  // public static readonly SESSION_SAVE_UNINITIALIZED: string = process.env.SESSION_SAVE_UNINITIALIZED!;
  //
  // public static readonly SESSION_PROXY: string = process.env.SESSION_PROXY!;
  //
  // public static readonly SESSION_GENERATE_ID: string = process.env.SESSION_GENERATE_ID!;
  //
  // public static readonly SESSION_STORE: string = process.env.SESSION_STORE!;
  //
  // public static readonly SESSION_UNSET: string = process.env.SESSION_UNSET!;
  //
  // public static readonly SESSION_PREFIX: string = process.env.SESSION_PREFIX!;
  //
  // public static readonly SESSION_SERIALIZER: string = process.env.SESSION_SERIALIZER!;
  //
  // public static readonly SESSION_DESTROY: string = process.env.SESSION_DESTROY!;
  //
  // public static readonly SESSION_TOUCH: string = process.env.SESSION_TOUCH!;

  public static readonly APPLE_ID: string = process.env.APPLE_ID!
  public static readonly AWS_BUCKET_NAME: string = process.env.AWS_BUCKET_NAME!
  public static readonly AWS_BUCKET_REGION: string =
    process.env.AWS_BUCKET_REGION!
  public static readonly AWS_ACCESS_KEY_ID: string =
    process.env.AWS_ACCESS_KEY_ID!
  public static readonly AWS_ACCESS_SECRET_KEY: string =
    process.env.AWS_ACCESS_SECRET_KEY!
  public static readonly REDIS_HOST: string = process.env.REDIS_HOST!
  public static readonly REDIS_PORT: number = Number(process.env.REDIS_PORT!)!
  public static readonly REDIS_USERNAME: string = process.env.REDIS_USERNAME!
  public static readonly REDIS_PASSWORD: string = process.env.REDIS_PASSWORD!
  public static readonly REDIS_DB: string = process.env.REDIS_DB!
  public static readonly USE_LOCAL_REDIS: string = process.env.USE_LOCAL_REDIS!

  constructor() {
    this.initialise()
    logger.warn(Variable.POSTGRES_DATABASE_URL)
  }

  private initialise(): void {
    VariableValidate()
  }
}

export default Variable
