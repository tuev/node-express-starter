import { checkAuthorization } from '@utils'

const requireAuthorization = async (req, res, next) => {
  const isAuthorized = await checkAuthorization(req)
  if (isAuthorized) {
    req.body.author = isAuthorized
    return next()
  } else {
    return res.sendStatus(401)
  }
}

export default requireAuthorization
