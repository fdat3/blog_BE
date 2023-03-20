import { cleanEnv, port, str, num } from 'envalid'

const validate = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    PORT: port({ default: 3030 }),
    SOCKET_PORT: port({ default: 5000 }),
    MONGO_DATABASE_URL: str(),
    POSTGRES_DATABASE_URL: str(),
    POSTGRES_DATABASE_NAME: str(),
    POSTGRES_DATABASE_USERNAME: str(),
    POSTGRES_DATABASE_PASSWORD: str(),
    JWT_SECRET: str(),
    PASS_SECRET: str(),
    SESSION_SECRET: str(),
    SESSION_NAME: str(),
    SESSION_KEYS: str(),
    SESSION_MAX_AGE: num(),
    APPLE_ID: str(),
    TELEGRAM_URL: str(),
    TELEGRAM_ROOM: str(),
    AWS_BUCKET_NAME: str(),
    AWS_BUCKET_REGION: str(),
    AWS_ACCESS_KEY_ID: str(),
    REDIS_HOST: str(),
    REDIS_PORT: num(),
    REDIS_USERNAME: str(),
    REDIS_PASSWORD: str(),
    REDIS_DB: str(),
    USE_LOCAL_REDIS: str({
      default: 'true',
    }),
  })
}

export default validate
