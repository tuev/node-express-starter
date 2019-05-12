import applyMiddleware from '@utils/applyMiddleware'
import { requireAuthorization, requireFeedAuthor } from '@middlewares'
import { images, department, category, product } from './brand.relation'

/* ------------------------------- QUERY BRAND ------------------------------- */

const brands = async (
  _,
  { filter = '', order: orderBy = 'createdAt_DESC' },
  { prisma }
) => {
  // MongoDB doesn't support OR logic ofr filter
  const where = filter ? { url_contains: filter } : {}
  const result = await prisma.brands({ where, orderBy })
  return result
}

const brand = (_, { id }, { prisma }) => prisma.brand({ id })

/* ----------------------------- MUTATION BRAND ---------------------------- */

const createBrand = (_, args, { prisma }) =>
  prisma.createBrand({
    ...args
  })

const updateBrand = (_, { id, ...args }, { prisma }) =>
  prisma.updateBrand({ where: { id }, data: args })

const deleteBrand = (_, { id }, { prisma }) => prisma.deleteBrand({ id })

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

const postEvt = applyMiddleware([requireAuthorization])(createBrand)
const updateEvt = applyMiddleware([requireAuthorization])(updateBrand)
const deleteEvt = applyMiddleware([requireAuthorization])(deleteBrand)

/* ------------------------------ SUBCRIBE BRAND ----------------------------- */

const brandSubcribe = (_, __, { prisma }) =>
  prisma.$subscribe.brand({ mutation_in: ['CREATED', 'UPDATED'] }).node()

const brandSubscription = {
  subscribe: brandSubcribe,
  resolve: payload => payload
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const brandResolvers = {
  Query: {
    brands,
    brand
  },
  Mutation: {
    addBrand: postEvt,
    updateBrand: updateEvt,
    deleteBrand: deleteEvt
  },
  Subscription: {
    brandSubscription
  },
  Brand: {
    images,
    category,
    department,
    product
  }
}
