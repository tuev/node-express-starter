export const images = ({ id }, __, { prisma }) => prisma.brand({ id }).images()
export const category = ({ id }, __, { prisma }) =>
  prisma.brand({ id }).category()
export const department = ({ id }, __, { prisma }) =>
  prisma.brand({ id }).department()
export const product = ({ id }, __, { prisma }) =>
  prisma.brand({ id }).product()
