const { app } = require('../app');

let server;
let baseUrl;

beforeAll(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(async () => {
  if (!server) {
    return;
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

describe('AutoDemo server', () => {
  test('returns health data', async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.service).toBe('autodemo');
  });

  test('generates a demo response', async () => {
    const response = await fetch(`${baseUrl}/api/generate-demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectName: 'Launch Kit',
        audience: 'Founders',
        callToAction: 'Start a pilot',
      }),
    });
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.status).toBe('ready');
    expect(payload.videoUrl).toBe('/demoVideo.mp4');
    expect(payload.title).toContain('Launch Kit');
  });

  test('serves the landing page', async () => {
    const response = await fetch(baseUrl);
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain('Turn a rough product pitch into a polished demo outline.');
  });
});
