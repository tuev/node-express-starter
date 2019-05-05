const requireFeedAuthor = async (_, args, { prisma, auth }) => {
  if (auth) {
    const { id: userId } = auth
    const { id } = args
    const isAuthor = await prisma.$exists.feed({
      AND: [{ id }, { author: { id: userId } }]
    })
    if (!isAuthor) {
      throw new Error('Not authorized')
    }
    return true
  }
  throw new Error('Not authenticated')
}

export default requireFeedAuthor
