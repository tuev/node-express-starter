import mongoose from 'mongoose'
const { Schema } = mongoose

const brandCollectionSchema = new Schema(
  {
    Brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand'
    },
    Collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    }
  },
  { timestamp: true }
)

const BrandCollection = mongoose.model('BrandCollection', brandCollectionSchema)

export default BrandCollection
