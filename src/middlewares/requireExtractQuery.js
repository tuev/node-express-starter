import { get } from 'lodash'
import { safeguardJSONParse } from '@utils'

const requireExtractQuery = async (req, res, next) => {
  const query = get(req, 'query', {})
  const populate = safeguardJSONParse(get(query, 'populate'))
  req.populate = populate
  next()
}

export default requireExtractQuery
