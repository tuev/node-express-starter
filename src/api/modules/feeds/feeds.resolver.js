import applyMiddleware from '@utils/applyMiddleware'
import { requireAuthorization, requireFeedAuthor } from '@middlewares'
import { author, liked } from './feed.relation'

/* ------------------------------- QUERY FEEF ------------------------------- */

const feeds = async (
  _,
  { filter = '', order: orderBy = 'createdAt_DESC' },
  { prisma }
) => {
  // MongoDB doesn't support OR logic ofr filter
  const where = filter ? { url_contains: filter } : {}
  const result = await prisma.feeds({ where, orderBy })
  return result
}

const feed = (_, { id }, { prisma }) => prisma.feed({ id })

/* ----------------------------- MUTATION FEED ---------------------------- */

const createFeed = (_, { description, url }, { prisma, auth }) =>
  prisma.createFeed({
    description,
    url,
    author: { connect: { id: auth.id } }
  })

const updateFeed = (_, { id, data }, { prisma }) =>
  prisma.updateFeed({ where: { id }, data })

const deleteFeed = (_, { id }, { prisma }) => prisma.deleteFeed({ id })

const likeFeed = async (_, { id }, { prisma, auth }) => {
  const { id: userId } = auth
  const isLiked = await prisma.$exists.feed({
    AND: [
      { id },
      {
        liked_some: {
          id: userId
        }
      }
    ]
  })
  isLiked
    ? await prisma.updateFeed({
        where: { id },
        data: { liked: { disconnect: { id: userId } } }
      })
    : await prisma.updateFeed({
        where: { id },
        data: { liked: { connect: { id: userId } } }
      })

  return `${isLiked ? 'Dislike' : 'Like'} successfully!`
}

/* ------------------------------ SUBCRIBE FEED ----------------------------- */

const feedSubcribe = (_, __, { prisma }) =>
  prisma.$subscribe.feed({ mutation_in: ['CREATED', 'UPDATED'] }).node()

const feedSubscription = {
  subscribe: feedSubcribe,
  resolve: payload => payload
}

/* ---------------------------- APPLY MIDDLEWARE ---------------------------- */

const postEvt = applyMiddleware([requireAuthorization])(createFeed)
const updateEvt = applyMiddleware([requireAuthorization, requireFeedAuthor])(
  updateFeed
)
const deleteEvt = applyMiddleware([requireAuthorization, requireFeedAuthor])(
  deleteFeed
)
const likeEvt = applyMiddleware([requireAuthorization])(likeFeed)

export const feedsResolvers = {
  Query: {
    feeds,
    feed
  },
  Mutation: {
    post: postEvt,
    like: likeEvt,
    updateFeed: updateEvt,
    deleteFeed: deleteEvt
  },
  Subscription: {
    feedSubscription
  },
  Feed: {
    author,
    liked
  }
}
