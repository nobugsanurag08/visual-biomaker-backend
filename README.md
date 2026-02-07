# Visual Biomaker Backend

Production-ready Node.js API built with Express, TypeScript, and modern tooling.

## Features

- **TypeScript** – Strict typing
- **Express** – Fast, minimal web framework
- **Security** – Helmet, CORS, rate limiting
- **Logging** – Winston with structured logs
- **Error handling** – Centralized handler and `AppError`
- **Health checks** – `/health/health` (liveness), `/health/ready` (readiness)
- **Testing** – Jest + Supertest
- **Linting** – ESLint + Prettier
- **Docker** – Multi-stage Dockerfile and docker-compose
- **Template render** – Form data + template ID → PNG (Puppeteer, replica of FE rendering)

## Prerequisites

- Node.js >= 18
- npm (or pnpm/yarn)
- **Template render:** Chrome/Chromium (Puppeteer). If you see "Could not find Chrome", either:
  - Run: `npx puppeteer browsers install chrome`, or
  - Use system Chrome (the app will try `/Applications/Google Chrome.app` on macOS).

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Development (watch mode)
npm run dev

# Production build and run
npm run build
npm start
```

## Scripts

| Script        | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start`   | Run compiled app (production)   |
| `npm test`    | Run tests with coverage         |
| `npm run lint` | Run ESLint                     |
| `npm run lint:fix` | Fix lint issues             |
| `npm run format` | Format code with Prettier    |

## API Endpoints

| Method | Path                 | Description              |
|--------|----------------------|--------------------------|
| GET    | `/`                  | Root / welcome           |
| GET    | `/health/health`     | Liveness check           |
| GET    | `/health/ready`      | Readiness check          |
| GET    | `/api`               | API info                 |
| GET    | `/api/render/templates` | List supported template IDs |
| POST   | `/api/render`        | Render biodata to PNG     |

### Template render (POST /api/render)

Body (JSON):

- `templateId`: any supported ID (see `GET /api/render/templates`). Examples: `"Sky Blossom"`, `"template22"`, `"Regal Anvika"`, `"template21"`, `"Purple Bee"`, `"template1"`, … (all 19 FE templates: 1–17, 21, 22).
- `formData`: same shape as visual-biomaker-v2 (e.g. `generalInfo`, `profileDetails`, `family`, `contacts`, `Others`)

Response: `image/png` (biodata image).

**Testing with Postman**

- **Method:** POST  
- **URL:** `http://localhost:3000/api/render` (adjust port if needed)  
- **Headers:** `Content-Type: application/json`  
- **Body:** raw → JSON → paste the payload (see `payload.json` in project root for a full example).

Send the request; response is PNG — use “Save Response” → “Save to a file” to download the image.

## Environment Variables

| Variable   | Default       | Description        |
|-----------|---------------|--------------------|
| `NODE_ENV`| `development` | Environment        |
| `PORT`    | `3000`        | Server port        |

See `.env.example` for a template.

## Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build image only
docker build -t visual-biomaker-backend .
docker run -p 3000:3000 visual-biomaker-backend
```

## Project Structure

```
src/
├── config/       # Environment and app config
├── middleware/   # Error handler, not-found, etc.
├── routes/       # health, api, render, preview (internal)
├── services/     # formDataToProfileData, templateRenderService (Puppeteer)
├── templates/    # HTML builders for all templates (utils, template22Html, template21Html, template1To17Html, index)
├── types/        # EditorFormData, ProfileData
├── utils/        # Logger
├── app.ts        # Express app setup
└── index.ts      # Entry point, server start
templates/
├── template-22/  # Static assets (pattern.png, star.png, ganesh.svg) – included
├── template-21/  # Optional: ganesh.png, goldenPhool.png (copy from FE public/assets/img/templates/template-21/)
└── template-N/   # Optional: copy assets from visual-biomaker-v2 public/assets/img/templates/template-N/ for full styling
tests/
├── setup.js      # Test env setup
└── app.test.ts   # API tests
```

## License

MIT
