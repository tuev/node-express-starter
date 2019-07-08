import mongoose from 'mongoose'
const { Schema } = mongoose

const imageSchema = new Schema(
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
    description: String
    // onPath: {
    //   type: Schema.Types.ObjectId,
    //   refPath: 'onModel'
    // },
    // onModel: {
    //   type: String,
    //   enum: ['Brand', 'Category', 'Collection', 'SKU']
    // }
  },
  { timestamps: true }
)

// imageSchema.virtual('SKU', {
//   ref: 'SKU',
//   localField: '_id',
//   foreignField: 'images'
// })

const Image = mongoose.model('Image', imageSchema)

export default Image
