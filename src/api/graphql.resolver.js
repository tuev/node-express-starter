import { merge } from 'lodash'

/***********************
 * RESOLVER FOR MODULE *
 ***********************/

import { feedsResolvers } from './modules/feeds'
import { userResolvers } from './modules/users'

/**************************
 * RESOLVER FOR DIRECTIVE *
 **************************/
import { emailResolvers, passwordResolvers } from './directives'

const resolvers = merge(
  {},
  userResolvers,
  feedsResolvers,
  emailResolvers,
  passwordResolvers
)

export default resolvers
