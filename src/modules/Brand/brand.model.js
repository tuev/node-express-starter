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
    categories: [String],
    collections: [String],
    image: [String]
  },
  { timestamps: true }
)

const Brand = mongoose.model('BrandModel', brandSchema)

export default Brand
