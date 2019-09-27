import { isError, get } from 'lodash'
import User from '@modules/User/user.model'

import jwt from 'jsonwebtoken'

export const safeguardJSONParse = string => {
  let result = string
  try {
    result = JSON.parse(result)
    return result
  } catch (error) {
    console.log(error)
    return result
  }
}

export const checkAuthorization = async req => {
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
        return userId
      } else {
        // throw new Error('Not authenticated')
        return false
      }
    }
  }
  // throw new Error('Not authenticated')
  return false
}
