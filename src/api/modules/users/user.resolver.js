import bscript from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'
import { requireAuthorization, requireScope } from '@middlewares'
import applyMiddleware from '@utils/applyMiddleware'
import User from './user.model'

const getUserList = async (_, __, { prisma, auth }) => {
  if (auth) {
    const result = await User.find()
    return result
  } else {
    throw new Error('Not authenticated')
  }
}

const signup = async (_, { username, password, email }) => {
  const user = await User.findOne({ email })
  console.log(user, 'user')
  if (!isEmpty(user)) {
    throw new Error('User has already exist')
  }
  const hash = await bscript.hash(password, 10)
  const newUser = await User.create({ username, password: hash, email })
  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN_MS
  })
  return {
    token,
    user: newUser
  }
}

const signin = async (_, { username, password }, { prisma }) => {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error("User doesn't exist")
  }
  const valid = await bscript.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN_MS
  })
  return {
    token,
    user
  }
}

const users = applyMiddleware([requireAuthorization, requireScope])(getUserList)

export const userResolvers = {
  Query: {
    users
  },
  Mutation: {
    signup,
    signin
  }
  // User: {
  //   // posts,
  //   liked
  // }
}
