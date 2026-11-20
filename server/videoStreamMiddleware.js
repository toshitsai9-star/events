import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(projectRoot, 'public');

/**
 * Robust HTTP Video Streaming Middleware with Range Requests (206 Partial Content)
 * Chrome, Safari, and Edge require HTTP 206 and Accept-Ranges to play & scrub MP4s.
 */
export function handleVideoStream(req, res, next) {
  try {
    const rawUrl = (req.url || '').split('?')[0];
    const isVideo = rawUrl.endsWith('.mp4') || rawUrl.endsWith('.webm') || rawUrl.startsWith('/videos/');

    if (!isVideo) {
      return next();
    }

    // Sanitize path to prevent directory traversal
    const safePath = path.normalize(rawUrl).replace(/^(\.\.[\/\\])+/, '');
    const candidatePaths = [
      path.join(publicDir, safePath),
      path.join(publicDir, safePath.replace(/^\/videos\//, '/')),
      path.join(publicDir, safePath.replace(/^\/videos\/portfolio\//, '/videos/')),
      path.join(projectRoot, 'dist', safePath),
    ];

    let filePath = null;
    for (const cand of candidatePaths) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        filePath = cand;
        break;
      }
    }

    if (!filePath) {
      // File not found on disk, pass to next middleware
      return next();
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    const contentType = rawUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4';

    if (range) {
      // HTTP 206 Partial Content
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        res.writeHead(416, {
          'Content-Range': `bytes */${fileSize}`,
        });
        return res.end();
      }

      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      });

      fileStream.pipe(res);
    } else {
      // Full file delivery with Accept-Ranges
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600',
      });

      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error('Video streaming middleware error:', err);
    next();
  }
}

