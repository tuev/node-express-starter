import { merge } from 'lodash'

/* ------------------------- RESOLVER FOR DIRECTIVE ------------------------- */

/* --------------------------- RESOLVER FOR SCALAR -------------------------- */

/* --------------------------- RESOLVER FOR MODULE -------------------------- */

import { userResolvers } from './User'

/* ------------------------- DEFINE GRAPHQL RESOLVER ------------------------ */

const resolvers = merge({}, userResolvers)

export default resolvers
