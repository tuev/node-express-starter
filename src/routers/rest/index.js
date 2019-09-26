/* -------------------------------------------------------------------------- */
/*                                 REST ROUTER                                */
/* -------------------------------------------------------------------------- */

import express from 'express'
import { apiErrorHandler } from '@utils/errorHandler'
import { userRouter } from '@modules/User'
import { isEmpty } from 'lodash'
import { eventRouter } from '@modules/Event'
import event from '@modules/Event/event.model'
import user from '@modules/User/user.model'
import restify from 'express-restify-mongoose'

import requireAuthorization from '@middlewares/requireAuthorization'

export const restRouter = express.Router()

restify.serve(restRouter, event, {
  totalCountHeader: true,
  preCreate: requireAuthorization,
  preDelete: requireAuthorization,
  preUpdate: requireAuthorization,
  prereq: requireAuthorization,
  contextFilter: (model, req, cb) => {
    const userInfo = req.body
    if (!isEmpty(userInfo)) {
      cb(model)
    } else {
      cb(
        model.find({
          status: 'published'
        })
      )
    }
  }
})

restify.serve(restRouter, user, {
  totalCountHeader: true,
  preCreate: (req, res, next) => {
    req.body._id = req.body.uid
    next()
  }
})

restRouter.use('/api/v1/oauth', userRouter)

restRouter.use('/api/v1/evt', eventRouter)

restRouter.use(apiErrorHandler)
