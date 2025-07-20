# Cloudinary Uploader

Yon ti sit statik pou upload imaj/oswa videyo dirèk nan Cloudinary (Unsigned Upload).

## Konfigirasyon

1. Kreye kont Cloudinary: https://cloudinary.com  
2. Nan **Settings → Upload → Upload Presets**, kreye yon **unsigned preset** (eg. `public_upload`).  
3. Edit `index.html`:
   ```js
   const CLOUD_NAME    = "dckwrqrur";
   const UPLOAD_PRESET = "public_upload";
