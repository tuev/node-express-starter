const { MongoMemoryServer } = require('mongodb-memory-server')
let ins
const boot = async () => {
  const mongod = new MongoMemoryServer()
  ins = mongod
  const uri = await mongod.getConnectionString()
  return { uri }
}
const close = () => {
  ins.close()
}

export { boot, close }
