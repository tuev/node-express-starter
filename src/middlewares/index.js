import bodyParser from 'body-parser'
import requireAuthorization from './requireAuthorization'

export { requireAuthorization }

export const setupMiddleware = app => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
}
