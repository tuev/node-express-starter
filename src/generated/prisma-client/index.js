'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var prisma_lib_1 = require('prisma-client-lib')
var typeDefs = require('./prisma-schema').typeDefs

var models = [
  {
    name: 'Brand',
    embedded: false
  },
  {
    name: 'Category',
    embedded: false
  },
  {
    name: 'Color',
    embedded: true
  },
  {
    name: 'Department',
    embedded: false
  },
  {
    name: 'Feed',
    embedded: false
  },
  {
    name: 'Image',
    embedded: true
  },
  {
    name: 'Product',
    embedded: false
  },
  {
    name: 'ProductEntity',
    embedded: false
  },
  {
    name: 'Size',
    embedded: true
  },
  {
    name: 'User',
    embedded: false
  }
]
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
})
exports.prisma = new exports.Prisma()
