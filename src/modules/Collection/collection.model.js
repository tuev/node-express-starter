import mongoose from 'mongoose'
const { Schema } = mongoose

const collectionSchema = new Schema(
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

const Collection = mongoose.model('CollectionModel', collectionSchema)

export default Collection
