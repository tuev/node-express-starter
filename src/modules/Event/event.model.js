import mongoose from 'mongoose'
const { Schema } = mongoose

const eventSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    date: {
      type: Date,
      required: false
    },
    price: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

export default Event
