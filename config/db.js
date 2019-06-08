const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connectDB = options => {
  const dbUri = process.env.MONGO_URI || ''
  console.log('is valid uri', dbUri)
  return mongoose
    .connect(dbUri, options)
    .then(() => console.log('MongoDB is connected'))
}

module.exports = connectDB
