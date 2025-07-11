import formidable from 'formidable'
import fs from 'fs'
import cloudinary from 'cloudinary'

export const config = { api: { bodyParser: false } }

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' })

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message })

    const file = files.file[0]
    const result = await cloudinary.v2.uploader.upload(file.filepath)
    return res.status(200).json({ url: result.secure_url })
  })
}
