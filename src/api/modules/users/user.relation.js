const posts = ({ id }, __, { prisma }) => prisma.user({ id }).posts()
const liked = ({ id }, __, { prisma }) => prisma.user({ id }).liked()

export { posts, liked }
