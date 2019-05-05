// Define REST ROUTER

import express from 'express'
import { apiErrorHandler } from './modules/errorHandler'

export const restRouter = express.Router()

restRouter.use(apiErrorHandler)
