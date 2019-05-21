import { ApolloServer } from 'apollo-server-express'
import resolvers from './graphql.resolver'
import typeDefs from './graphql.typeDefs'
import schemaDirectives from './directives'
// import { prisma } from '../generated/prisma-client'

export const graphQLRouter = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives
  // context: request => ({ ...request, prisma })
})
