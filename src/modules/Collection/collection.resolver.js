import Collection from './collection.model'
import { camelCase, get } from 'lodash'

/* ------------------------------- QUERY ------------------------------- */

const collections = async () => {
  const result = await Collection.find({})
  return result
}

const collection = async (_, { id }) => {
  const result = await Collection.findById(id)
  return result
}

/* ----------------------------- MUTATION ---------------------------- */

const addCollection = async (_, { name, slug: slugInfo = '', description }) => {
  const slug = slugInfo || camelCase(name)
  const result = await Collection.create({ name, slug, description })
  return result
}

const deleteCollection = async (_, { id }) => {
  const result = await Collection.deleteOne({ _id: id })
  const deletedCount = get(result, 'deletedCount', 0)
  return !!deletedCount
}

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

/* ------------------------------ SUBCRIBE ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const collectionResolvers = {
  Query: { collection, collections },
  Mutation: { addCollection, deleteCollection },
  Subscription: {}
}
