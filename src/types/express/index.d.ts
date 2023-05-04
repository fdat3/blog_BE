import { User, UserDevice, Blog } from '@/models/pg'

declare global {
  namespace Express {
    export interface Request {
      user: User
      blog: Blog
    }

    export type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
      json(data: T): TypedResponse<T>
    } & { status(code: number): TypedResponse<T> }
  }
}

declare module 'express-session' {
  interface SessionData {
    user?: User
    device?: UserDevice
  }
}
