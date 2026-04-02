const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.static(publicDir));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'autodemo',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/generate-demo', (req, res) => {
  const {
    projectName = 'Demo Project',
    audience = 'Prospects',
    callToAction = 'Book a walkthrough',
  } = req.body || {};

  const safeProjectName = String(projectName).trim() || 'Demo Project';
  const safeAudience = String(audience).trim() || 'Prospects';
  const safeCallToAction = String(callToAction).trim() || 'Book a walkthrough';

  res.json({
    status: 'ready',
    title: `${safeProjectName} product demo`,
    summary: `Storyboard prepared for ${safeAudience.toLowerCase()} with a closing CTA to "${safeCallToAction}".`,
    scenes: [
      'Open with the customer problem and product promise.',
      'Show the fastest path to value in the product.',
      'Close with a clear next step for the viewer.',
    ],
    videoUrl: '/demoVideo.mp4',
    generatedAt: new Date().toISOString(),
    assetAvailable: true,
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`AutoDemo listening on http://localhost:${port}`);
  });
}

module.exports = { app };
