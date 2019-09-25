const cloudinary = require('cloudinary')

const cloudImg = (options = {}) =>
  cloudinary.config({
    cloud_name: process.env.CLOUD_IMG_NAME,
    api_key: process.env.CLOUD_IMG_API_KEY,
    api_secret: process.env.API_IMG_SECRET,
    ...options
  })

export default cloudImg
