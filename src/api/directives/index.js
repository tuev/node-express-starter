import { emailResolvers, emailDirectives } from './email'
import { passwordResolvers, passwordDirectives } from './password'
import * as directives from './directives.graphql'

export { directives }

export {
  emailResolvers,
  emailDirectives,
  passwordDirectives,
  passwordResolvers
}

export const schemaDirectives = {
  ...emailDirectives,
  ...passwordDirectives
}

export default schemaDirectives
