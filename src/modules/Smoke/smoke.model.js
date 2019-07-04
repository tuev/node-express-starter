import mongoose from 'mongoose'
const { Schema } = mongoose

const smokeSchema = new Schema(
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
    value: String
  },
  { timestamps: true }
)

const Smoke = mongoose.model('Smoke', smokeSchema)

export default Smoke
