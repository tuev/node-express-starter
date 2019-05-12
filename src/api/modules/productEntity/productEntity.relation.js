export const images = ({ id }, __, { prisma }) =>
  prisma.productEntity({ id }).images()
export const size = ({ id }, __, { prisma }) =>
  prisma.productEntity({ id }).size()
export const color = ({ id }, __, { prisma }) =>
  prisma.productEntity({ id }).color()
export const product = ({ id }, __, { prisma }) =>
  prisma.productEntity({ id }).product()
