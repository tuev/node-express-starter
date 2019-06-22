import mongoose from 'mongoose'
const { Schema } = mongoose

const productSchema = new Schema(
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
    isPublic: Boolean,
    views: Number,
    likes: Number,
    status: Boolean,
    releaseDate: Date,
    rate: Number,
    skus: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SKU'
      }
    ]
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
