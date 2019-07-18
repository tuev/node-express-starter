import fs from 'fs'
import mongoose from 'mongoose'

const db = mongoose.connection

export const getAllFileInDir = async data => {
  let files = []
  try {
    const stats = fs.statSync(data)
    if (stats.isDirectory()) {
      const childFiles = await loadDir(data)
      files = childFiles
    }
    if (stats.isFile()) {
      files.push(data)
    }
  } catch (error) {
    console.log(error)
  }

  return files
}

const loadDir = async dir => {
  let result = []
  try {
    const files = fs.readdirSync(dir)
    const allFiles = await files.reduce(async (accPromise, file) => {
      const acc = await accPromise
      const fileDir = `${dir}/${file}`
      const newFiles = await getAllFileInDir(fileDir)
      return [...acc, ...newFiles]
    }, Promise.resolve([]))
    result = allFiles
  } catch (error) {
    console.log(error)
  }
  return result
}

export const loadObject = async data => {
  for (const key in data) {
    await insertCollection(key, data[key])
  }
}

const insertCollection = async (modelName = '', data = []) => {
  const Model = await db.model(modelName)
  await Model.deleteMany()
  await Promise.all(
    data.map(async item => {
      try {
        const doc = new Model(item)
        await doc.save()
      } catch (error) {}
    })
  )

  // Use to test mock data
  // const result = await Model.find({})
  // console.log(result, 'result')
}
