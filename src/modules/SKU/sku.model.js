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
    discount: String
  },
  { timestamps: true }
)

const SKU = mongoose.model('SKUModel', skuSchema)

export default SKU
