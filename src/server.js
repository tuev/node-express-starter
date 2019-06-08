import express from 'express'

const app = express()
app.get('/', (req, res) => {
  res.json({ status: true })
})

export default app
