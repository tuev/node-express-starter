import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: Date,
  email: {
    type: String,
    unique: true,
    required: true
  }
})

const User = mongoose.model('UserModel', userSchema)

export default User
