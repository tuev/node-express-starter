export const entity = ({ id }, __, { prisma }) =>
  prisma.product({ id }).entity()
export const category = ({ id }, __, { prisma }) =>
  prisma.product({ id }).category()
export const department = ({ id }, __, { prisma }) =>
  prisma.product({ id }).department()
export const brand = ({ id }, __, { prisma }) => prisma.product({ id }).brand()
