# AutoDemo

AutoDemo is now a small, production-ready Node app that lets a user generate a structured demo brief from the browser. The original snapshot had conflicting entrypoints and an incomplete media pipeline, so this version has been normalized into one deployable Express service with a static frontend and simple API.

## What changed

- Unified the app around `app.js` and `public/`
- Replaced the broken ffmpeg and Puppeteer flow with a stable `/api/generate-demo` endpoint
- Added a polished responsive UI
- Added health and integration tests with Vitest
- Added Render deployment configuration
- Kept Docker support for container-based hosting

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Test

```bash
npm test
```

## API

### `GET /api/health`

Returns service health metadata.

### `POST /api/generate-demo`

Example payload:

```json
{
  "projectName": "AutoDemo",
  "audience": "Revenue teams",
  "callToAction": "Book a live walkthrough"
}
```

Returns a generated storyboard response and a bundled sample video URL.

## Deploy

### Render

This repo includes `render.yaml` for Blueprint deployment.

One-click Blueprint link:

`https://render.com/deploy?repo=https://github.com/Jojobeans1981/demo-maker`

Manual settings if needed:

- Runtime: `Node`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

### Docker

```bash
docker compose up --build
```
