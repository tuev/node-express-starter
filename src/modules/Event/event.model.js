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
      required: true
    },
    date: Date,
    price: String,
    location: String
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

export default Event
