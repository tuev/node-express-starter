import { gql } from 'apollo-server-express'
import { feedsType } from './modules/feeds'
import { userType } from './modules/users'
import { directives } from './directives'

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
const typeDefs = [baseType, directives, feedsType, userType]

export default typeDefs
