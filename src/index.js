import http from 'http'
import app from './server'
// import { graphQLRouter } from './api'
import { connect } from './db'

// require('dotenv').config()
require('custom-env').env(true)
const server = http.createServer(app)
// graphQLRouter.installSubscriptionHandlers(server)
let currentApp = app
console.log(process.env.PORT, 'port')
connect()
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
if (process.env.NODE_ENV !== 'production') {
  // HMR setup
  if (module.hot) {
    module.hot.accept(['./server', './api'], () => {
      server.removeListener('request', currentApp)
      server.on('request', app)
      currentApp = app
    })
  }
}
