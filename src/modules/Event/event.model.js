import mongoose from 'mongoose'
const { Schema } = mongoose

const eventSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    author: { type: String, ref: 'User' },
    description: {
      type: String
    },
    image: String,
    banner: String,
    date: Date,
    price: String,
    location: String,
    timeStart: Date,
    timeEnd: Date,
    organizer: String,
    locationType: {
      type: String,
      enum: ['revenue', 'online'],
      default: 'revenue'
    },
    category: {
      type: String,
      enum: ['education', 'charity'],
      default: 'charity'
    }
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

export default Event
