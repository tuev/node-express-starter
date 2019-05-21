import { SchemaDirectiveVisitor } from 'graphql-tools'
import {
  defaultFieldResolver,
  GraphQLScalarType,
  GraphQLNonNull
} from 'graphql'
import { ApolloError } from 'apollo-server-express'
import { passwordRegEx } from '@utils'
import { PasswordType } from '@scalars'

class PasswordDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    this.wrapType(field)
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (source, args, context, info) => {
      const password = await resolve(source, args, context, info)
      if (passwordRegEx.test(password)) {
        return password
      }
      return new ApolloError('Password failed validation', 'INVALID_PASSWORD')
    }
  }

  visitInputFieldDefinition (field) {
    this.wrapType(field)
  }

  visitArgumentDefinition (argument) {
    this.wrapType(argument)
  }

  wrapType (field) {
    if (
      field.type instanceof GraphQLNonNull &&
      field.type.ofType instanceof GraphQLScalarType
    ) {
      field.type = new GraphQLNonNull(new PasswordType(field.type.ofType))
    } else if (field.type instanceof GraphQLScalarType) {
      field.type = new PasswordType(field.type)
    } else {
      throw new Error(`Not a scalar type: ${field.type}`)
    }
  }
}

export const passwordDirectives = {
  Password: PasswordDirective
}
