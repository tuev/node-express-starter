import { merge } from 'lodash'

/* ------------------------- RESOLVER FOR DIRECTIVE ------------------------- */

// import schemaDirectives from './directives'

/* --------------------------- RESOLVER FOR SCALAR -------------------------- */

// import { emailResolvers, passwordResolvers } from './scalars'

/* --------------------------- RESOLVER FOR MODULE -------------------------- */

// import { brandResolvers } from './modules/brand'
// import { categoryResolvers } from './modules/category'
// import { departmentResolvers } from './modules/department'
// import { productResolvers } from './modules/product'
// import { feedsResolvers } from './modules/feeds'
import { userResolvers } from './modules/users'

const resolvers = merge(
  {},
  // schemaDirectives,
  userResolvers
  // feedsResolvers,
  // brandResolvers,
  // categoryResolvers,
  // departmentResolvers,
  // productResolvers,
  // emailResolvers,
  // passwordResolvers
)

export default resolvers
