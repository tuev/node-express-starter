/* -------------------------------------------------------------------------- */
/*                                 REST ROUTER                                */
/* -------------------------------------------------------------------------- */

import express from 'express'
import { apiErrorHandler } from '@utils/errorHandler'
// import { eventRouter } from '@modules/Event'
import event from '@modules/Event/event.model'
import user from '@modules/User/user.model'
import restify from 'express-restify-mongoose'

export const restRouter = express.Router()

restify.serve(restRouter, event, { totalCountHeader: true })
restify.serve(restRouter, user, { totalCountHeader: true })

// restRouter.use('/api/v1/event', eventRouter)

restRouter.use(apiErrorHandler)
