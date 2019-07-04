/* -------------------------------------------------------------------------- */
/*                                 REST ROUTER                                */
/* -------------------------------------------------------------------------- */

import express from 'express'
import { apiErrorHandler } from '@utils/errorHandler'
import { userRouter } from './User'
import { smokeRouter } from './Smoke'

export const restRouter = express.Router()

restRouter.use(userRouter)
restRouter.use('/smoke', smokeRouter)

restRouter.use(apiErrorHandler)
