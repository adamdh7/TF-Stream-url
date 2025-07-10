// api/upload.js
import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export const config = {
  api: {
    bodyParser: false
  }
};

// Configurez ces 3 variables dans Vercel → Settings → Environment Variables
cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const form = new IncomingForm();
  form.parse(req, (_, __, files) => {
    const file = files.media;
    if (!file) {
      return res.status(400).json({ error: 'Aucun fichier reçu.' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'tf-stream-uploads' },
      (err, result) => {
        if (err) {
          console.error('Cloudinary Error:', err);
          return res.status(500).json({ error: 'Échec de l’upload.' });
        }
        // On renvoie l’URL + type et format pour info
        res.status(200).json({
          url:    result.secure_url,
          type:   result.resource_type,
          format: result.format
        });
      }
    );

    streamifier.createReadStream(file.filepath).pipe(uploadStream);
  });
        }
