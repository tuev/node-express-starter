import { isError } from 'lodash'
import User from '@modules/User/user.model'

const jwt = require('jsonwebtoken')

const requireAuthorization = async (_, __, context) => {
  const authorization = context.req.get('Authorization')
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const tokenInfo = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, result) => err || result
    )
    if (!isError(tokenInfo)) {
      const { userId } = tokenInfo
      const userObj = await User.findById(userId)
      if (userObj) {
        return { auth: userObj }
      } else {
        throw new Error('Not authenticated')
      }
    }
  }
  throw new Error('Not authenticated')
}

export default requireAuthorization
