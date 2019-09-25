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
    banner: { type: String, ref: 'Image' },
    date: Date,
    price: String,
    address: String,
    timeStart: Date,
    timeEnd: Date,
    organizer: String,
    type: {
      type: String,
      enum: ['tour', 'convention'],
      default: 'tour'
    },
    addressType: {
      type: String,
      enum: ['revenue', 'online'],
      default: 'revenue'
    },
    category: {
      type: String,
      enum: ['education', 'charity'],
      default: 'charity'
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'draft'
    }
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

export default Event
