import express from 'express'
import * as eventController from './event.controller'

const smokeRouter = express.Router()

smokeRouter.get('/', eventController.getSmoke)

export { smokeRouter }
