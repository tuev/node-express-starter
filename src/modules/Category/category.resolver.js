import Category from './category.model'
import { camelCase, get } from 'lodash'

/* ------------------------------- QUERY ------------------------------- */

const categories = async () => {
  const categories = await Category.find({})
  return categories
}

const category = async (_, { id }) => {
  const category = await Category.findById(id)
  return category
}

/* ----------------------------- MUTATION ---------------------------- */

const addCategory = async (_, { name, description }) => {
  const slug = camelCase(name)
  const result = await Category.create({ name, slug, description })
  return result
}

const deleteCategory = async (_, { id }) => {
  const result = await Category.deleteOne({ _id: id })
  const deletedCount = get(result, 'deletedCount', 0)
  return !!deletedCount
}

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

/* ------------------------------ SUBCRIBE ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const categoryResolvers = {
  Query: { categories, category },
  Mutation: { addCategory, deleteCategory },
  Subscription: {}
}
