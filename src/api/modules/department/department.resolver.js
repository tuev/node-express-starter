import applyMiddleware from '@utils/applyMiddleware'
import { requireAuthorization } from '@middlewares'
import { images, brand, category, product } from './department.relation'

/* ------------------------------- QUERY ------------------------------- */

const departments = async (
  _,
  { filter = '', order: orderBy = 'createdAt_DESC' },
  { prisma }
) => {
  // MongoDB doesn't support OR logic ofr filter
  const where = filter ? { url_contains: filter } : {}
  const result = await prisma.departments({ where, orderBy })
  return result
}

const department = (_, { id }, { prisma }) => prisma.department({ id })

/* ----------------------------- MUTATION  ---------------------------- */

const createDepartment = (_, args, { prisma }) => prisma.createDepartment(args)

const updateDepartment = (_, { id, ...args }, { prisma }) =>
  prisma.updateDepartment({ where: { id }, data: args })

const deleteDepartment = (_, { id }, { prisma }) =>
  prisma.deleteDepartment({ id })

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

const postEvt = applyMiddleware([requireAuthorization])(createDepartment)
const updateEvt = applyMiddleware([requireAuthorization])(updateDepartment)
const deleteEvt = applyMiddleware([requireAuthorization])(deleteDepartment)

/* ------------------------------ SUBCRIBE  ----------------------------- */

const depertmentSubcribe = (_, __, { prisma }) =>
  prisma.$subscribe.depertment({ mutation_in: ['CREATED', 'UPDATED'] }).node()

const departmentSubscription = {
  subscribe: depertmentSubcribe,
  resolve: payload => payload
}

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const departmentResolvers = {
  Query: {
    departments,
    department
  },
  Mutation: {
    addDepartment: postEvt,
    updateDepartment: updateEvt,
    deleteDepartment: deleteEvt
  },
  Subscription: {
    departmentSubscription
  },
  Department: {
    images,
    category,
    brand,
    product
  }
}
