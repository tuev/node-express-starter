import Image from './image.model'
import { camelCase, get } from 'lodash'

/* ------------------------------- QUERY ------------------------------- */

const images = async () => {
  const images = await Image.find({})
  return images
}

const image = async (_, { id }) => {
  const image = await Image.findById(id)
  return image
}

/* ----------------------------- MUTATION ---------------------------- */

const addImage = async (
  _,
  { name, url, slug: slugInfo = '', on, onModel = '' }
) => {
  const slug = slugInfo || camelCase(name)
  const newImage = await Image.create({ name, url, slug, on, onModel })
  return newImage
}

const deleteImage = async (_, { id }) => {
  const result = await Image.deleteOne({ _id: id })
  return !!get(result, 'deletedCount', false)
}

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

/* ------------------------------ SUBCRIBE ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                  */
/* -------------------------------------------------------------------------- */

export const imageResolvers = {
  Query: { images, image },
  Mutation: { addImage, deleteImage },
  Subscription: {}
}
