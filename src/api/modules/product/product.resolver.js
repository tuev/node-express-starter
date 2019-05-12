import applyMiddleware from '@utils/applyMiddleware'
import { requireAuthorization } from '@middlewares'
import { entity, department, category, brand } from './product.relation'

/* ------------------------------- QUERY  ------------------------------- */

const products = async (
  _,
  { filter = '', order: orderBy = 'createdAt_DESC' },
  { prisma }
) => {
  // MongoDB doesn't support OR logic ofr filter
  const where = filter ? { url_contains: filter } : {}
  const result = await prisma.products({ where, orderBy })
  return result
}

const product = (_, { id }, { prisma }) => prisma.product({ id })

/* ----------------------------- MUTATION ---------------------------- */

const createProduct = (_, args, { prisma }) => prisma.createProduct({ ...args })

const updateProduct = (_, { id, ...args }, { prisma }) =>
  prisma.updateProduct({ where: { id }, data: args })

const deleteProduct = (_, { id }, { prisma }) => prisma.deleteProduct({ id })

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

const postEvt = applyMiddleware([requireAuthorization])(createProduct)
const updateEvt = applyMiddleware([requireAuthorization])(updateProduct)
const deleteEvt = applyMiddleware([requireAuthorization])(deleteProduct)

/* ------------------------------ SUBCRIBE  ----------------------------- */

const productSubcribe = (_, __, { prisma }) =>
  prisma.$subscribe.product({ mutation_in: ['CREATED', 'UPDATED'] }).node()

const productSubscription = {
  subscribe: productSubcribe,
  resolve: payload => payload
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const productResolvers = {
  Query: {
    products,
    product
  },
  Mutation: {
    addProduct: postEvt,
    updateProduct: updateEvt,
    deleteFeed: deleteEvt
  },
  Subscription: {
    productSubscription
  },
  Product: {
    category,
    department,
    brand,
    entity
  }
}
