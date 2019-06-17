import mongoose from 'mongoose'
const { Schema } = mongoose

const sizeSchema = new Schema(
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
    value: {
      type: String,
      enum: ['S', 'M', 'L', 'XL', 'XXL'],
      default: 'M'
    },
    description: String
  },
  { timestamps: true }
)

const Size = mongoose.model('SizeModel', sizeSchema)

export default Size
