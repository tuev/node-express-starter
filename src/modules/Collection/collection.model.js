import mongoose from 'mongoose'
const { Schema } = mongoose

const collectionSchema = new Schema(
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
    brands: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BrandCollection'
      }
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CategoryCollection'
      }
    ],
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Image'
      }
    ],
    SKUs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SKU'
      }
    ]
  },
  { timestamps: true }
)

const Collection = mongoose.model('Collection', collectionSchema)

export default Collection
