/* -------------------------------------------------------------------------- */
/*                                 REST ROUTER                                */
/* -------------------------------------------------------------------------- */

import express from 'express'
import { apiErrorHandler } from '@utils/errorHandler'
import { userRouter } from './User'

export const restRouter = express.Router()

restRouter.use('/user', userRouter)

restRouter.use(apiErrorHandler)
