import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dyrcgw9wb',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
;(async function () {
  try {
    const results = await cloudinary.uploader.upload('./images')
    console.log('Upload results:', results)
  } catch (error) {
    console.error('Error uploading image:', error)
  }
})()
