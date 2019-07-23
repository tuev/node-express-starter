/* -------------------------------------------------------------------------- */
/*                                 REST ROUTER                                */
/* -------------------------------------------------------------------------- */

import express from 'express'
import { apiErrorHandler } from '@utils/errorHandler'
import { userRouter } from '@modules/User'
import { eventRouter } from '@modules/Event'

export const restRouter = express.Router()

restRouter.use('/', userRouter)
restRouter.use('/api/v1/event', eventRouter)

restRouter.use(apiErrorHandler)
