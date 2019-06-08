import { ApolloServer } from 'apollo-server-express'
import resolvers from './graphql.resolver'
import typeDefs from './graphql.typeDefs'

export const graphQLRouter = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => ({ ...request })
})
