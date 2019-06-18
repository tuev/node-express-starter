import mongoose from 'mongoose'
const { Schema } = mongoose

const categorySchema = new Schema(
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
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Image'
      }
    ],
    brands: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BrandCategory'
      }
    ],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CategoryCollection'
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

const Category = mongoose.model('Category', categorySchema)

export default Category
