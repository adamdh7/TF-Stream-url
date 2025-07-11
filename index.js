const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000; // DuckDNS ap pwen sou port sa a
const DOMAIN = "tf-stream-url.duckdns.org";

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>TF-Stream-URL</title></head>
      <body style="background:black;color:white;text-align:center;">
        <h1>Bienvenue sur <strong>${DOMAIN}</strong>!</h1>
        <p>Site aktif sou DuckDNS 🚀</p>
      </body>
    </html>
  `);
});

// Lanse server
app.listen(PORT, () => {
  console.log(`✅ http://${DOMAIN} ap koute sou port ${PORT}`);
});
