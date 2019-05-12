import applyMiddleware from '@utils/applyMiddleware'
import { requireAuthorization } from '@middlewares'
import { images, department, brand, product } from './category.relation'

/* ------------------------------- QUERY ------------------------------- */

const categories = async (
  _,
  { filter = '', order: orderBy = 'createdAt_DESC' },
  { prisma }
) => {
  // MongoDB doesn't support OR logic ofr filter
  const where = filter ? { url_contains: filter } : {}
  const result = await prisma.categories({ where, orderBy })
  return result
}

const category = (_, { id }, { prisma }) => prisma.category({ id })

/* ----------------------------- MUTATION ---------------------------- */

const createCategory = (_, args, { prisma, auth }) =>
  prisma.createCategory({
    ...args
  })

const updateCategory = (_, { id, ...args }, { prisma }) =>
  prisma.updateCategory({ where: { id }, data: args })

const deleteCategory = (_, { id }, { prisma }) => prisma.deleteCategory({ id })

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

const postEvt = applyMiddleware([requireAuthorization])(createCategory)
const updateEvt = applyMiddleware([requireAuthorization])(updateCategory)
const deleteEvt = applyMiddleware([requireAuthorization])(deleteCategory)

/* ------------------------------ SUBCRIBE  ----------------------------- */

const categorySubcribe = (_, __, { prisma }) =>
  prisma.$subscribe.category({ mutation_in: ['CREATED', 'UPDATED'] }).node()

const categorySubscription = {
  subscribe: categorySubcribe,
  resolve: payload => payload
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const categoryResolvers = {
  Query: {
    categories,
    category
  },
  Mutation: {
    addCategory: postEvt,
    updateCategory: updateEvt,
    deleteCategory: deleteEvt
  },
  Subscription: {
    categorySubscription
  },
  Category: {
    images,
    brand,
    department,
    product
  }
}
