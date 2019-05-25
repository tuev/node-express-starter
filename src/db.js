import mongoose from 'mongoose'
mongoose.Promise = global.Promise

export const connect = () => {
  console.log(process.env.MONGO_URI, 'MONGO URI')
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      user: 'admin',
      pass: '1qazZAQ!',
      auth: {
        authdb: 'magic'
      }
    })
    .then(() => console.log('Mongo connected'))
    .catch(e => console.log(e))
}
