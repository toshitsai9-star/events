import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to load or read .env file for HEYGEN_API_KEY
function getHeyGenApiKey() {
  if (process.env.HEYGEN_API_KEY) {
    return process.env.HEYGEN_API_KEY.trim();
  }
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/^HEYGEN_API_KEY=(.*)$/m);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return '';
}

// Helper to save HEYGEN_API_KEY to .env
function saveHeyGenApiKey(key) {
  process.env.HEYGEN_API_KEY = key;
  const envPath = path.join(rootDir, '.env');
  let content = '';
  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, 'utf8');
  }
  if (/^HEYGEN_API_KEY=/m.test(content)) {
    content = content.replace(/^HEYGEN_API_KEY=.*$/m, `HEYGEN_API_KEY=${key}`);
  } else {
    content += `\nHEYGEN_API_KEY=${key}\n`;
  }
  fs.writeFileSync(envPath, content.trim() + '\n', 'utf8');
}

// Helper to get configuration file path
function getConfigPath() {
  return path.join(rootDir, 'src', 'config', 'digitalHostConfig.json');
}

function loadConfig() {
  const p = getConfigPath();
  if (fs.existsSync(p)) {
    try {
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {
      console.error('Error parsing digitalHostConfig.json:', e);
    }
  }
  return {
    heading: 'Meet Your Digital Host',
    subheading: 'మీకు స్వాగతం చెప్పడానికి నేను ఇక్కడ ఉన్నాను.',
    founderName: 'Anil Reddy',
    script: 'నమస్కారం! అందరికీ \n"హాయ్ అండి, నా పేరు అనిల్ — ఫౌండర్ ఆఫ్ ఆది రెడ్డి ఈవెంట్స్ & ఫెసిలిటేటర్స్,"',
    language: 'Telugu',
    voiceGender: 'Male',
    selectedVoiceId: 'te-IN-MohanNeural',
    videoUrl: '/avatar/digital-host.mp4',
    fallbackVideoUrl: '/anil-reddy-intro.mp4',
  };
}

function saveConfig(data) {
  const p = getConfigPath();
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Avatar API Middleware handler for Vite and Node.js
 */
export async function handleAvatarApi(req, res, next) {
  const url = req.url.split('?')[0];

  // Route: POST /api/avatar/save-video (Save encoded fixed_avatar video)
  if (req.method === 'POST' && url === '/api/avatar/save-video') {
    let body = [];
    req.on('data', (chunk) => body.push(chunk));
    req.on('end', () => {
      try {
        const fullBuf = Buffer.concat(body);
        const fileName = req.headers['x-filename'] || 'fixed_avatar.webm';
        const dest = path.join(rootDir, 'public', fileName);
        fs.writeFileSync(dest, fullBuf);
        console.log(`Saved ${fileName}, size: ${fullBuf.length} bytes`);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, file: fileName, size: fullBuf.length }));
      } catch (e) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Route: POST /api/avatar/save-analysis
  if (req.method === 'POST' && url === '/api/avatar/save-analysis') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      fs.writeFileSync(path.join(rootDir, 'scratch', 'video_analysis.json'), body);
      console.log('Saved video_analysis.json');
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true }));
    });
    return;
  }

  // Route: POST /api/avatar/save-frame (Internal tool for video frame inspection)
  if (req.method === 'POST' && url === '/api/avatar/save-frame') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { data, time } = JSON.parse(body);
        if (data) {
          const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
          const buf = Buffer.from(base64Data, 'base64');
          fs.writeFileSync(path.join(rootDir, 'scratch', 'video_frame.jpg'), buf);
          console.log('Saved video_frame.jpg, size:', buf.length);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Route: GET /api/avatar/config
  if (req.method === 'GET' && url === '/api/avatar/config') {
    const config = loadConfig();
    const apiKey = getHeyGenApiKey();
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        ...config,
        hasApiKey: Boolean(apiKey && apiKey.length > 5),
        apiKeyMasked: apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : '',
      })
    );
    return;
  }

  // Route: POST /api/avatar/config (Save Script, Voice, Subheading)
  if (req.method === 'POST' && url === '/api/avatar/config') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const current = loadConfig();
        const updated = { ...current, ...payload };
        saveConfig(updated);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, config: updated }));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Route: POST /api/avatar/api-key (Update HEYGEN_API_KEY)
  if (req.method === 'POST' && url === '/api/avatar/api-key') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { apiKey } = JSON.parse(body);
        if (!apiKey) {
          throw new Error('API Key cannot be empty');
        }
        saveHeyGenApiKey(apiKey.trim());
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, message: 'API key saved securely to .env' }));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Route: GET /api/avatar/voices (Fetch Telugu Voices from HeyGen API)
  if (req.method === 'GET' && url === '/api/avatar/voices') {
    const apiKey = getHeyGenApiKey();

    if (!apiKey) {
      // Fallback curated Telugu male & female voices list with preview metadata
      const standardTeluguVoices = [
        {
          voice_id: 'te-IN-MohanNeural',
          name: 'Mohan (Standard Andhra Telugu)',
          language: 'Telugu',
          locale: 'te-IN',
          gender: 'male',
          accent: 'Andhra Pradesh, India',
          preview_audio: 'https://files.heygen.ai/voice/preview/te-IN-Mohan.mp3',
          support_pause: true,
          emotion_support: true,
        },
        {
          voice_id: 'te-IN-ChandraNeural',
          name: 'Chandra (Formal Telugu Narrator)',
          language: 'Telugu',
          locale: 'te-IN',
          gender: 'male',
          accent: 'Telangana & AP',
          preview_audio: 'https://files.heygen.ai/voice/preview/te-IN-Chandra.mp3',
          support_pause: true,
          emotion_support: false,
        },
        {
          voice_id: 'te-IN-ShrutiNeural',
          name: 'Shruti (Welcoming Telugu Host)',
          language: 'Telugu',
          locale: 'te-IN',
          gender: 'female',
          accent: 'Hyderabad, India',
          preview_audio: 'https://files.heygen.ai/voice/preview/te-IN-Shruti.mp3',
          support_pause: true,
          emotion_support: true,
        },
      ];

      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          source: 'curated_fallback',
          message: 'HeyGen API key not set in .env. Showing standard verified Telugu voice profiles.',
          voices: standardTeluguVoices,
        })
      );
      return;
    }

    try {
      // Call HeyGen official v3 voices endpoint with language filter
      const response = await fetch('https://api.heygen.com/v3/voices?type=public&language=Telugu', {
        headers: {
          'X-Api-Key': apiKey,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HeyGen API returned HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const rawVoices = data.data?.voices || data.voices || [];

      // Filter and prioritize Telugu male voices
      const filtered = rawVoices.map((v) => ({
        voice_id: v.voice_id || v.id,
        name: v.name || v.display_name,
        language: v.language || 'Telugu',
        gender: v.gender || 'male',
        preview_audio: v.preview_audio || v.preview_audio_url || '',
        support_pause: v.support_pause ?? true,
      }));

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ source: 'heygen_live', voices: filtered }));
    } catch (err) {
      console.error('Failed to query HeyGen voices:', err);
      res.statusCode = 502;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Route: POST /api/avatar/generate (Trigger Talking Photo Generation on HeyGen)
  if (req.method === 'POST' && url === '/api/avatar/generate') {
    const apiKey = getHeyGenApiKey();
    if (!apiKey) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Missing HEYGEN_API_KEY. Configure it in Admin settings or .env file.' }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { script, voiceId, testMode } = JSON.parse(body);
        if (!script || !script.trim()) {
          throw new Error('Telugu script cannot be empty');
        }

        // HeyGen Video Generation Request
        // Payload targets talking_photo / photo avatar character with the Telugu text script
        const payload = {
          video_inputs: [
            {
              character: {
                type: 'talking_photo',
                // Can use custom uploaded talking_photo_id or photo url
                talking_photo_id: 'c881cbb47df5472288174fb0e97dcf56', // default photo avatar or custom id
              },
              voice: {
                type: 'text',
                input_text: script.trim(),
                voice_id: voiceId || 'te-IN-MohanNeural',
                speed: 1.0,
              },
              background: {
                type: 'color',
                value: '#F2F0E6',
              },
            },
          ],
          dimension: {
            width: 1280,
            height: 720,
          },
          test: Boolean(testMode),
        };

        const heygenRes = await fetch('https://api.heygen.com/v2/video/generate', {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const heygenData = await heygenRes.json();
        if (!heygenRes.ok || heygenData.error) {
          throw new Error(heygenData.message || heygenData.error || `HTTP ${heygenRes.status}`);
        }

        const videoId = heygenData.data?.video_id || heygenData.video_id;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: true,
            videoId,
            message: 'Video generation task created on HeyGen',
          })
        );
      } catch (err) {
        console.error('Error generating video via HeyGen:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Route: GET /api/avatar/status/:videoId (Check HeyGen Video Render Status)
  if (req.method === 'GET' && url.startsWith('/api/avatar/status/')) {
    const videoId = url.replace('/api/avatar/status/', '').trim();
    const apiKey = getHeyGenApiKey();

    if (!apiKey) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Missing HEYGEN_API_KEY' }));
      return;
    }

    try {
      // Check status with HeyGen v3 videos or v1 video_status endpoint
      const checkRes = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
        headers: {
          'X-Api-Key': apiKey,
          'Accept': 'application/json',
        },
      });

      const checkData = await checkRes.json();
      if (!checkRes.ok) {
        throw new Error(checkData.message || `HTTP ${checkRes.status}`);
      }

      const info = checkData.data || checkData;
      const status = info.status || 'processing'; // pending, processing, completed, failed
      const videoUrl = info.video_url || '';
      const progress = status === 'completed' ? 100 : status === 'processing' ? 65 : 20;

      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          status,
          progress,
          videoUrl,
          error: info.error || info.failure_message || null,
        })
      );
    } catch (err) {
      console.error('Error checking video status:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Route: POST /api/avatar/publish (Save Completed Video to Website)
  if (req.method === 'POST' && url === '/api/avatar/publish') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { videoUrl } = JSON.parse(body);
        if (!videoUrl) throw new Error('Video URL required');

        const current = loadConfig();
        current.videoUrl = videoUrl;
        current.lastGeneratedAt = new Date().toISOString();
        saveConfig(current);

        // Optionally cache the video file locally to /public/avatar/digital-host.mp4
        const localDest = path.join(rootDir, 'public', 'avatar', 'digital-host.mp4');
        const avatarDir = path.join(rootDir, 'public', 'avatar');
        if (!fs.existsSync(avatarDir)) fs.mkdirSync(avatarDir, { recursive: true });

        // Stream and download in background
        fetch(videoUrl)
          .then((res) => {
            if (res.ok) {
              const fileStream = fs.createWriteStream(localDest);
              res.body.pipe(fileStream);
            }
          })
          .catch((e) => console.log('Notice: Streaming local copy skipped:', e.message));

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, config: current }));
      } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  next();
}

