# Setup Guide

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm start
```

Visit `http://localhost:3000`.

## Verify the app

```bash
npm test
```

## Production deployment

The project is ready for Node-friendly hosts such as Render, Railway, Fly.io, or any Docker platform.

### Required settings

- Build command: `npm install`
- Start command: `npm start`
- Port: provided by the `PORT` environment variable

### Docker

```bash
docker compose up --build
```
