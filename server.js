import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export const config = {
  api: {
    bodyParser: false, // on désactive le parser natif de Vercel/Next.js
  },
};

// Configuration via les variables d’environnement Vercel
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const form = new IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err || !files.media) {
      return res.status(400).json({ error: 'Fichier manquant ou erreur de parsing' });
    }

    const file = files.media;

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'tf-stream-uploads' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Error:', error);
          return res.status(500).json({ error: 'Upload Cloudinary échoué' });
        }
        // On renvoie l’URL publique
        res.status(200).json({ url: result.secure_url });
      }
    );

    // On pipe le buffer vers Cloudinary
    streamifier.createReadStream(file.filepath).pipe(uploadStream);
  });
        }
