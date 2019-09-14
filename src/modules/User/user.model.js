import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    displayName: {
      type: String,
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
    photoURL: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'visitor', 'root'],
      default: 'visitor'
    },
    // making sure _id === uid
    _id: String,
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
