import { images, color, size, product } from './productEntity.relation'

/* ------------------------------- QUERY BRAND ------------------------------- */

/* ----------------------------- MUTATION BRAND ---------------------------- */

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

/* ------------------------------ SUBCRIBE BRAND ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const productEntityResolvers = {
  Query: {},
  Mutation: {},
  Subscription: {},
  productEntity: {
    images,
    color,
    size,
    product
  }
}
