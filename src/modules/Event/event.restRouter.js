import express from 'express'
import * as eventController from './event.controller'
import requireAuthorization from '@middlewares/requireAuthorization'
import requireExtractQuery from '@middlewares/requireExtractQuery'

const eventRouter = express.Router()

eventRouter
  .get('/', eventController.getEvent)
  .get('/:event_id', requireExtractQuery, eventController.getEventById)
  .post('/', requireAuthorization, eventController.createEvent)
  .put('/:event_id', requireAuthorization, eventController.updateEvent)
  .delete('/:event_id', requireAuthorization, eventController.deleteEvent)
  .post('/fake', requireAuthorization, eventController.fakeData)

export { eventRouter }
