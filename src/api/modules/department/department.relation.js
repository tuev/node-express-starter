export const images = ({ id }, __, { prisma }) =>
  prisma.department({ id }).images()
export const category = ({ id }, __, { prisma }) =>
  prisma.department({ id }).category()
export const brand = ({ id }, __, { prisma }) =>
  prisma.department({ id }).brand()
export const product = ({ id }, __, { prisma }) =>
  prisma.department({ id }).product()
