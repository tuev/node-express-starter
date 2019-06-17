import mongoose from 'mongoose'
const { Schema } = mongoose

const imageSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    url: String,
    description: String
  },
  { timestamps: true }
)

const Image = mongoose.model('ImageModel', imageSchema)

export default Image
