import Color from './color.model'
import { camelCase, get } from 'lodash'
/* ------------------------------- QUERY ------------------------------- */

const colors = async () => {
  const result = await Color.find({})
  return result
}

const color = async (_, { id }) => {
  const result = await Color.findById({ _id: id })
  return result
}

/* ----------------------------- MUTATION ---------------------------- */

const addColor = async (
  _,
  { name, slug: slugInfo = '', value = 'white', description = '' }
) => {
  const slug = slugInfo || camelCase(name)
  const color = await Color.create({ name, slug, value, description })
  return color
}

const deleteColor = async (_, { id }) => {
  const result = await Color.deleteOne({ _id: id })
  const deletedColor = get(result, 'deletedCount', false)
  return !!deletedColor
}

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

/* ------------------------------ SUBCRIBE ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const colorResolvers = {
  Query: { colors, color },
  Mutation: { addColor, deleteColor },
  Subscription: {}
}
