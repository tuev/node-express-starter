export const images = ({ id }, __, { prisma }) =>
  prisma.category({ id }).images()
export const brand = ({ id }, __, { prisma }) => prisma.category({ id }).brand()
export const department = ({ id }, __, { prisma }) =>
  prisma.category({ id }).department()
export const product = ({ id }, __, { prisma }) =>
  prisma.category({ id }).product()
