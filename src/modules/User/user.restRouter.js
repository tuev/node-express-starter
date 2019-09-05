import express from 'express'
import * as userController from './user.controller'

const userRouter = express.Router()

userRouter.put('/:event_id', userController.updateUser)

export { userRouter }
