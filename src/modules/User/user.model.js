import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      unique: true,
      required: true
    },
    uid: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    photoUrl: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'visitor', 'root'],
      default: 'visitor'
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
