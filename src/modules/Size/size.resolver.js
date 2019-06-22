import Size from './size.model'
import { camelCase, get } from 'lodash'

/* ------------------------------- QUERY ------------------------------- */

const sizes = async () => {
  const sizes = await Size.find({})
  return sizes
}

const size = async (_, { id }) => {
  const size = await Size.findById(id)
  return size
}

/* ----------------------------- MUTATION ---------------------------- */

const addSize = async (
  _,
  { name = '', slug: slugInfo = '', value = 'M', description = '' }
) => {
  const slug = slugInfo || camelCase(name)
  const result = await Size.create({
    name,
    slug,
    value,
    description
  })
  return result
}

const deleteSize = async (_, { id }) => {
  const result = await Size.deleteOne({ _id: id })
  return !!get(result, 'deletedCount', false)
}

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

/* ------------------------------ SUBCRIBE ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const sizeResolvers = {
  Query: { sizes, size },
  Mutation: { addSize, deleteSize },
  Subscription: {}
}
