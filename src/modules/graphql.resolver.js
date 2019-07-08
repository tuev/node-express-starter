import { merge } from 'lodash'

/* ------------------------- RESOLVER FOR DIRECTIVE ------------------------- */

/* --------------------------- RESOLVER FOR SCALAR -------------------------- */

/* --------------------------- RESOLVER FOR MODULE -------------------------- */

import { userResolvers } from './User'
import { brandResolvers } from './Brand'
import { categoryResolvers } from './Category'
import { collectionResolvers } from './Collection'
import { colorResolvers } from './Color'
import { imageResolvers } from './Image'

/* ------------------------- DEFINE GRAPHQL RESOLVER ------------------------ */

const resolvers = merge(
  {},
  userResolvers,
  brandResolvers,
  categoryResolvers,
  collectionResolvers,
  colorResolvers,
  imageResolvers
)

export default resolvers
