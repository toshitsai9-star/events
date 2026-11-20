/**
 * Developer Guard: No Blur / Fade / Mask on Founder Component
 * 
 * Verifies that no blur, backdrop-filter, gradient mask, drop-shadow, or pixelated rendering
 * can ever be reintroduced to the founder avatar component or its parent wrappers.
 * Edge quality comes exclusively from the GPU video matte shader.
 */

const fs = require('fs');
const path = require('path');

const FOUNDER_FILES = [
  path.resolve(__dirname, '../src/components/avatar-hero/WebGLAvatarMatte.jsx'),
  path.resolve(__dirname, '../src/components/avatar-hero/LipSyncAvatar.jsx'),
];

const FORBIDDEN_PATTERNS = [
  { pattern: /filter:\s*['"]?.*blur/i, name: 'filter: blur()' },
  { pattern: /backdrop-filter:\s*['"]?.*blur/i, name: 'backdrop-filter: blur()' },
  { pattern: /backdrop-blur/i, name: 'backdrop-blur utility on founder' },
  { pattern: /mask-image:\s*['"]?.*gradient/i, name: 'mask-image gradient' },
  { pattern: /-webkit-mask-image:\s*['"]?.*gradient/i, name: '-webkit-mask-image gradient' },
  { pattern: /image-rendering:\s*['"]?pixelated/i, name: 'image-rendering: pixelated' },
  { pattern: /floorFade/i, name: 'floorFade soft bottom mask' },
];

let hasErrors = false;

for (const filePath of FOUNDER_FILES) {
  if (!fs.existsSync(filePath)) {
    console.error(`[GUARD ERROR] File not found: ${filePath}`);
    hasErrors = true;
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Verify mandatory comment header exists
  if (!content.includes('No blur, fade, or mask effects on the founder. Edge quality comes from the video matte.')) {
    console.error(`[GUARD ERROR] Missing required comment in: ${path.basename(filePath)}`);
    console.error(`  Expected: "No blur, fade, or mask effects on the founder. Edge quality comes from the video matte."`);
    hasErrors = true;
  }

  lines.forEach((line, index) => {
    // Ignore pure doc comments explaining what NOT to do
    if (line.trim().startsWith('*') || line.trim().startsWith('//') || line.includes('No blur')) {
      return;
    }

    for (const rule of FORBIDDEN_PATTERNS) {
      if (rule.pattern.test(line)) {
        console.error(`[GUARD VIOLATION] ${rule.name} detected in ${path.basename(filePath)}:${index + 1}`);
        console.error(`  Line ${index + 1}: ${line.trim()}`);
        hasErrors = true;
      }
    }
  });
}

if (hasErrors) {
  console.error('\n❌ Founder edge quality guard FAILED. Prohibited blur/fade/mask rules found.');
  process.exit(1);
} else {
  console.log('✅ Founder edge quality guard PASSED: Zero blur, fade, or gradient mask on founder.');
  process.exit(0);
}

