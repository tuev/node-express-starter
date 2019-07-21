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
    Color: Schema.Types.ObjectId,
    Size: Schema.Types.ObjectId,
    Brand: Schema.Types.ObjectId,
    Collection: Schema.Types.ObjectId,
    Category: Schema.Types.ObjectId,
    Images: [Schema.Types.ObjectId],
    Product: Schema.Types.ObjectId
  },
  { timestamps: true }
)

const SKU = mongoose.model('SKU', skuSchema)

export default SKU
