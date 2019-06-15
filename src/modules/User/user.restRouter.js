import express from 'express'
import User from './user.model'
import restify from 'express-restify-mongoose'

const userRouter = express.Router()

restify.serve(userRouter, User)

export { userRouter }
