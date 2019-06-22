import mongoose from 'mongoose'
const { Schema } = mongoose

const categoryCollectionSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    }
  },
  { timestamps: true }
)

const CategoryCollection = mongoose.model(
  'CategoryCollection',
  categoryCollectionSchema
)

export default CategoryCollection
