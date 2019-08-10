/* -------------------------------------------------------------------------- */
/*                                 REST ROUTER                                */
/* -------------------------------------------------------------------------- */

import express from 'express'
import { apiErrorHandler } from '@utils/errorHandler'
import { eventRouter } from '@modules/Event'

export const restRouter = express.Router()

restRouter.use('/api/v1/event', eventRouter)

restRouter.use(apiErrorHandler)
