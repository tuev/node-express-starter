import Product from './product.model'
import { camelCase, get } from 'lodash'

/* ------------------------------- QUERY ------------------------------- */

const products = async () => {
  const products = await Product.find({})
  console.log(products, 'products')
  return products
}

const product = async (_, { id }) => {
  const product = await Product.findById(id)
  return product
}

/* ----------------------------- MUTATION ---------------------------- */

const addProduct = async (
  _,
  {
    name = '',
    slug: slugInfo = '',
    description = '',
    isPublic = false,
    status = false,
    releaseDate = new Date()
  }
) => {
  const slug = slugInfo || camelCase(name)
  const product = await Product.create({
    name,
    slug,
    description,
    isPublic,
    status,
    releaseDate
  })
  return product
}

const deleteProduct = async (_, { id }) => {
  const result = await Product.deleteOne({ _id: id })
  return !!get(result, 'deletedCount', false)
}

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

/* ------------------------------ SUBCRIBE ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const productResolvers = {
  Query: { products, product },
  Mutation: { addProduct, deleteProduct },
  Subscription: {}
}
