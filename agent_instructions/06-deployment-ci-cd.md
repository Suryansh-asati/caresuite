# Deployment & CI/CD Pipeline

The project relies on GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD). Deployments span frontend static hosting and backend API hosting.

## CI/CD Workflow (GitHub Actions)
Build/test processes kick off automatically on push.

### Frontend Deployment
- Uses `JamesIves/github-pages-deploy-action` to push static React build (`caresuite-web/build`) to a `gh-pages` branch.
- Alternatively, deployed via built-in hooks to Vercel/Netlify.
- Process: `npm ci` -> `npm run lint` -> `npm test` -> `npm run build`.

### Backend Deployment
- Uses `akhileshns/heroku-deploy` to automate server deployment.
- Deploys the Node/Express app to Heroku environments based on standard secrets (`HEROKU_API_KEY`, `HEROKU_APP_NAME`, `HEROKU_EMAIL`).
- Ensure Heroku variables match production credentials.

## Environments
- **Local**: Run backend (`node server`.js) and frontend (`npm start`) manually. Connected via `.env`.
- **Staging**: Actions deploy the `staging` branch (preview frontends, staging Heroku instances).
- **Production**: Merging code to `main` deploys directly to production URLs natively.