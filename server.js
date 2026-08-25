import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static assets from root
app.use(express.static(__dirname));

// Ensure sub-directories are served regardless of path prefix
app.use('/js/data', express.static(path.join(__dirname, 'data')));
app.use('/js/components', express.static(path.join(__dirname, 'components')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// SPA fallback: return index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ReserveHub server running at http://0.0.0.0:${PORT}`);
});
