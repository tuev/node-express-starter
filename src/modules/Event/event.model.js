import mongoose from 'mongoose'
const { Schema } = mongoose

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      unique: true,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    value: String
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

export default Event
