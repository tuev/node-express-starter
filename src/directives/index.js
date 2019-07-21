import { emailDirectives } from './email.directive'
import * as directives from './directive.graphql'

export { directives }

export { emailDirectives }

export const schemaDirectives = {
  ...emailDirectives
}

export default schemaDirectives
