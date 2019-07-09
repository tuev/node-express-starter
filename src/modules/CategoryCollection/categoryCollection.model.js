import mongoose from 'mongoose'
const { Schema } = mongoose

const categoryCollectionSchema = new Schema(
  {
    Category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    Collection: {
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
