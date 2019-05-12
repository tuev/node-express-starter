import { emailDirectives } from './email'
import { passwordDirectives } from './password'
import * as directives from './directives.graphql'

export { directives }

export { emailDirectives, passwordDirectives }

export const schemaDirectives = {
  ...emailDirectives,
  ...passwordDirectives
}

export default schemaDirectives
