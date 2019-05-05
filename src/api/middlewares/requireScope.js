// todo: rewrite requireScope middleware
const requireScope = async (root, args, context, info) => {
  // const { auth } = context
  // // throw new Error('not permitted');
  // const Authorization = context.req.get('Authorization')
  // if (Authorization) {
  //   const token = Authorization.replace('Bearer ', '')
  //   const tokenInfo = await jwt.verify(
  //     token,
  //     process.env.JWT_SECRET,
  //     (err, result) => err || result
  //   )
  //   if (!isError(tokenInfo)) {
  //     const { userId } = tokenInfo
  //     const userObj = await context.prisma.user({ id: userId })
  //     return { scope: userObj }
  //   }
  // }
  // throw new Error('Not authenticated')
}

export default requireScope
