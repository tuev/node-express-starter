const { isError } = require('lodash')

const applyMiddleware = (middlwares = []) => resolver => async (
  root,
  args,
  context,
  info
) => {
  const rootPipe = root
  const argsPipe = args
  let contextPipe = context
  const infoPipe = info
  for (const middlware of middlwares) {
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
