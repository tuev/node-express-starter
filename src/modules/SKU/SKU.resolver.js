import SKU from './sku.model'
import { camelCase, get } from 'lodash'

/* ------------------------------- QUERY ------------------------------- */

const skus = async () => {
  const result = await SKU.find({})
  return result
}

const sku = async (_, { id }) => {
  const result = await SKU.findById(id)
  return result
}

/* ----------------------------- MUTATION ---------------------------- */

const addSKU = async (
  _,
  {
    name = '',
    slug: slugInfo = '',
    quantity = 0,
    price = 0,
    discount = 0,
    isPublic = false,
    color = '',
    size = '',
    brand = '',
    collection = '',
    category = '',
    images = [],
    product = ''
  }
) => {
  const slug = slugInfo || camelCase(name)
  const result = await SKU.create({
    name,
    slug,
    quantity,
    price,
    discount,
    isPublic,
    color,
    size,
    brand,
    collection,
    category,
    images,
    product
  })
  return result
}

const deleteSKU = async (_, { id }) => {
  const result = await SKU.deleteOne({ _id: id })
  return !!get(result, 'deletedCount', false)
}

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

/* ------------------------------ SUBCRIBE ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const SKUResolvers = {
  Query: { skus, sku },
  Mutation: { addSKU, deleteSKU },
  Subscription: {}
}
