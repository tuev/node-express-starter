import { isError } from 'lodash'

const jwt = require('jsonwebtoken')

const requireAuthorization = async (_, __, context) => {
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const tokenInfo = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, result) => err || result
    )
    if (!isError(tokenInfo)) {
      const { userId } = tokenInfo
      const userObj = await context.prisma.user({ id: userId })
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
