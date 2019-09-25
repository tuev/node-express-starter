import mongoose from 'mongoose'
const { Schema } = mongoose

const imageSchema = new Schema(
  {
    url: {
      type: String,
      unique: true,
      required: true
    },
    id: String,
    event: { type: String, ref: 'Event' }
  },
  { timestamps: true }
)

const Image = mongoose.model('Image', imageSchema)

export default Image
