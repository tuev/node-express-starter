import mongoose from 'mongoose'
const { Schema } = mongoose

const colorSchema = new Schema(
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
    value: String,
    description: String,
    SKUs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SKU'
      }
    ]
  },
  { timestamps: true }
)

const Color = mongoose.model('Color', colorSchema)

export default Color
