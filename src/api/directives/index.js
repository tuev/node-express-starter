import { emailDirectives } from './email'
import { passwordDirectives } from './password'
import { brandDirectives } from './brand'
import * as directives from './directives.graphql'

export { directives }

export { emailDirectives, passwordDirectives }

export const schemaDirectives = {
  ...emailDirectives,
  ...passwordDirectives
  // ...brandDirectives
}

export default schemaDirectives
