import { ApolloServer } from 'apollo-server-express'
import resolvers from './graphql.resolver'
import schemaDirectives from '@directives'
import typeDefs from './graphql.typeDefs'

export const graphQLRouter = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: request => ({ ...request })
})
