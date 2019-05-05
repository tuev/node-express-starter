import http from 'http'
import app from './server'
import { graphQLRouter } from './api'

require('dotenv').config()
const server = http.createServer(app)
graphQLRouter.installSubscriptionHandlers(server)
let currentApp = app

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})

// HMR setup
if (module.hot) {
  module.hot.accept(['./server', './api'], () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
