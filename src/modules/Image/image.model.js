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
    description: String,
    on: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel'
    },
    onModel: {
      type: String,
      required: true,
      enum: ['Brand', 'Category', 'Collection', 'SKU']
    }
  },
  { timestamps: true }
)

imageSchema.virtual('SKU', {
  ref: 'SKU',
  localField: '_id',
  foreignField: 'images'
})

const Image = mongoose.model('Image', imageSchema)

export default Image
