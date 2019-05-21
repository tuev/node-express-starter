import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import { ApolloError } from 'apollo-server-express'

class BrandDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field) {
    this.wrapType(field)
  }

  visitArgumentDefinition(argument) {
    const { resolve = defaultFieldResolver } = argument
    field.argument = async (source, args, { prisma }, info) => {
      console.log(argument)
      // const checkValid
      await resolve(source, args, context, info)
      // if (emailRegEx.test(email)) {
      //   return email
      // }
      // return new ApolloError('Email address failed validation', 'INVALID_EMAIL')
    }
  }
}

export const brandDirectives = {
  brand: BrandDirective
}
