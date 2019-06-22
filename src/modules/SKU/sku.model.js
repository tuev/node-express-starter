import mongoose from 'mongoose'
const { Schema } = mongoose

const skuSchema = new Schema(
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
    quantity: Number,
    price: String,
    discount: String,
    isPublic: {
      type: Boolean,
      default: false
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: 'Color'
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: 'Size'
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand'
    },
    collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Image'
      }
    ],
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  { timestamps: true }
)

const SKU = mongoose.model('SKUModel', skuSchema)

export default SKU
