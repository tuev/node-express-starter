import mongoose from 'mongoose'
const { Schema } = mongoose

const brandCategorySchema = new Schema(
  {
    Brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand'
    },
    Category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  {
    timestamps: true
  }
)

const BrandCategory = mongoose.model('BrandCategory', brandCategorySchema)

export default BrandCategory
