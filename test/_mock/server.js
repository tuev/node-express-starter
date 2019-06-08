// const querystring = require('querystring')
// const sift = require('sift')
// const fs = require('fs')
// const path = require('path')
// const nock = require('nock')

// let originalDB = {}
// let prefixApi = ''

// function loadDb (filePath, db = {}) {
//   const dataObjects = require(filePath)
//   return {
//     ...db,
//     ...dataObjects
//   }
// }

// function mockApiForModel (prefixApi, key, dbModel) {
//   // find by query
//   nock(prefixApi)
//     .persist()
//     .get(`/${key}`)
//     .query(true)
//     .reply(200, (uri, requestBody, cb) => {
//       const qs = querystring.parse(uri.split('?')[1])
//       let { query = '{}' } = qs
//       query = JSON.parse(query)
//       const resData = sift(query, dbModel)

//       if (process.env.NODE_ENV !== 'test') {
//         console.warn(`MockHit [MetadataRest][find] ${key}`, query)
//       }

//       return cb(null, resData)
//     })
// }

// function startServer (options, db) {
//   originalDB = db
//   prefixApi = options.prefixApi
//   reset()
// }

// function reset () {
//   let db = { ...originalDB }
//   const keys = Object.keys(db)
//   keys.forEach(key => mockApiForModel(prefixApi, key, db[key]))
// }

// function stop () {
//   nock.cleanAll()
// }

// async function boot (options = {}) {
//   const { mockupDir } = options

//   const filenames = fs.readdirSync(mockupDir)

//   let db = {}
//   for (let index = 0; index < filenames.length; index++) {
//     const element = path.join(mockupDir, filenames[index])
//     db = loadDb(element, db)
//   }

//   startServer(options, db)
// }

// export { boot, reset, stop }
