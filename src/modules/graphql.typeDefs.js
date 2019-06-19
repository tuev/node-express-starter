import { gql } from 'apollo-server-express'

/* ------------------------- TYPE FOR DIRECTIVE ------------------------- */

/* --------------------------- TYPE FOR SCALAR -------------------------- */

/* --------------------------- TYPE FOR MODULE -------------------------- */

import { userType } from './User'
import { brandType } from './Brand'

/* ------------------------- DEFINE GRAPHQL TYPEDEF ------------------------ */

const baseType = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`
const typeDefs = [baseType, userType, brandType]

export default typeDefs
