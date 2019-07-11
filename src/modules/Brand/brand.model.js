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
    Collections: [Schema.Types.ObjectId],
    Categories: [Schema.Types.ObjectId],
    Images: [Schema.Types.ObjectId],
    SKUs: [Schema.Types.ObjectId]
  },
  { timestamps: true }
)

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
