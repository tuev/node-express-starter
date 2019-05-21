import express from 'express'
// import { setupMiddleware } from '@middlewares'
// import { graphQLRouter } from './api'

const app = express()

// setupMiddleware(app)

// graphql route
// graphQLRouter.applyMiddleware({ app })

// catch all
app.all('*', (req, res) => {
  res.json({ ok: true })
})

export default app
