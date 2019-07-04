import express from 'express'
import * as smokeController from './smoke.controller'

const smokeRouter = express.Router()

smokeRouter.get('/', smokeController.getSmoke)

export { smokeRouter }
