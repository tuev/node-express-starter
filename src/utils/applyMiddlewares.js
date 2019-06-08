const { isError } = require('lodash')

const applyMiddleware = (middlwares = []) => resolver => async (
  root,
  args,
  context,
  info
) => {
  let rootPipe = root
  let argsPipe = args
  let contextPipe = context
  let infoPipe = info
  for (let middlware of middlwares) {
    const result = await middlware(rootPipe, argsPipe, contextPipe, infoPipe)
    if (!isError(result)) {
      contextPipe = { ...contextPipe, ...result }
    } else {
      return result
    }
  }

  const result = await resolver(rootPipe, argsPipe, contextPipe, infoPipe)
  return result
}

export default applyMiddleware
