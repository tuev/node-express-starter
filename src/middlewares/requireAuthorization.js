import { isError, get } from 'lodash'
import User from '@modules/User/user.model'

const jwt = require('jsonwebtoken')

const requireAuthorization = async (req, res, next) => {
  const authorization = get(req, 'headers.authorization')
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
        req.body.author = userId
        return next()
      } else {
        // throw new Error('Not authenticated')
        return res.sendStatus(401)
      }
    }
  }
  // throw new Error('Not authenticated')
  return res.sendStatus(401)
}

export default requireAuthorization
