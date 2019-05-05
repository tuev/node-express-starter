const author = ({ id }, __, { prisma }) => prisma.feed({ id }).author()
const liked = ({ id }, __, { prisma }) => prisma.feed({ id }).liked()

export { author, liked }
