import { merge } from 'lodash'

/* ------------------------- RESOLVER FOR DIRECTIVE ------------------------- */

/* --------------------------- RESOLVER FOR SCALAR -------------------------- */

/* --------------------------- RESOLVER FOR MODULE -------------------------- */

import { userResolvers } from './user'

/* ------------------------- DEFINE GRAPHQL RESOLVER ------------------------ */

const resolvers = merge({}, userResolvers)

export default resolvers
