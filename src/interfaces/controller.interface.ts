import express, { Router } from 'express'

interface Controller {
  path: string
  router: Router
}

export default Controller

export interface ICrudOption {
  filter?: any
  limit?: number
  offset?: number
  scope?: string[]
  order?: any[]
  attributes?: any[]
  includes?: any[]
  distinct?: boolean
  paranoid?: boolean
  transaction?: any

  [key: string]: any
}

export interface Request extends express.Request {
  queryInfo?: ICrudOption

  [x: string]: any
}

export interface Response extends express.Response {
  [x: string]: any
}

export interface ICrudExecOption {
  allowNull?: boolean
  msg?: string
}
