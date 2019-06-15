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
    url: String
  },
  { timestamps: true }
)

const Category = mongoose.model('CategoryModel', categorySchema)

export default Category
