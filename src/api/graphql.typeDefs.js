import { gql } from 'apollo-server-express'
// import { feedsType } from './modules/feeds'
// import { brandType } from './modules/brand'
// import { categoryType } from './modules/category'
// import { departmentType } from './modules/department'
// import { productType } from './modules/product'
// import { productEntityType } from './modules/productEntity'

import { userType } from './modules/users'
// import { directives } from './directives'
// import { scalars } from './scalars'

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
const typeDefs = [
  baseType,
  // directives,
  // scalars,
  // feedsType,
  userType
  // brandType,
  // categoryType,
  // departmentType,
  // productType,
  // productEntityType
]

export default typeDefs
