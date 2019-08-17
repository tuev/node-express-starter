import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cors from 'cors'

import morgan from 'morgan'

export const setupMiddleware = app => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors({
    exposedHeaders: ['X-Total-Count']
  }))

  app.all('*', function (req, res, next) {
    var origin = req.get('origin')
    res.header('Access-Control-Allow-Origin', origin)
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS'
    )
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    next()
  })
  app.use(methodOverride())
  app.use(morgan('combined'))
}
