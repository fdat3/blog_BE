import express, { Router } from 'express'
import { FingerprintResult } from 'express-fingerprint'
import { FindAttributeOptions } from 'sequelize'

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
  attributes?: FindAttributeOptions
  includes?: any[]
  distinct?: boolean
  paranoid?: boolean
  transaction?: any

  [key: string]: any
}

export interface Request extends express.Request {
  queryInfo?: ICrudOption
  fingerprint?: FingerprintResult

  [x: string]: any
}

export interface Response extends express.Response {
  [x: string]: any
}

export interface ICrudExecOption {
  allowNull?: boolean
  msg?: string
}
