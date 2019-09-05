/* -------------------------------------------------------------------------- */
/*                                 REST ROUTER                                */
/* -------------------------------------------------------------------------- */

import express from 'express'
import { apiErrorHandler } from '@utils/errorHandler'
import { userRouter } from '@modules/User'
import event from '@modules/Event/event.model'
import user from '@modules/User/user.model'
import restify from 'express-restify-mongoose'

export const restRouter = express.Router()

restify.serve(restRouter, event, { totalCountHeader: true })
restify.serve(restRouter, user, {
  totalCountHeader: true,
  preCreate: (req, res, next) => {
    req.body._id = req.body.uid
    next()
  }
})

restRouter.use('/api/v1/oauth', userRouter)

restRouter.use(apiErrorHandler)
