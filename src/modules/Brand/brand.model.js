import mongoose from 'mongoose'
const { Schema } = mongoose

const brandSchema = new Schema(
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
    description: String,
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BrandCategory'
      }
    ],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BrandCollection'
      }
    ],
    image: [String],
    SKUs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SKU'
      }
    ]
  },
  { timestamps: true }
)

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
