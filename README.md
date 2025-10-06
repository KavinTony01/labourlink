LabourLink - Angular MVP (in-memory)

This frontend is a self-contained Angular app using in-memory data (LocalStorage + BehaviorSubjects).
It provides a simple role-based Client/Worker flow suitable for deployment as static files (Netlify/GitHub Pages).

Quick start (Windows PowerShell):

1. Install dependencies
   npm install

2. Run dev server
   npm start

3. Build for production
   npm run build

Notes:
- Credentials: client1 / 123  (role: Client), worker1 / 123 (role: Worker)
- To deploy on GitHub Pages, ensure the correct base href in `src/index.html` before `ng build`.
 - Admin credentials: admin / 1234

Deploying to GitHub Pages (recommended quick method)

1. Commit your frontend changes to the `main` branch.
2. The included GitHub Actions workflow `/.github/workflows/gh-pages.yml` will run on push to `main` and build + deploy the app to GitHub Pages using the `labourlink` repository name as the base href.
3. Ensure your repository settings -> Pages points to `gh-pages` branch.

Manual GitHub Pages build (local)

1. Build with base href for repo:

```powershell
npm run build:ghpages
```

2. Copy the contents of `dist/labourlink-frontend` to the `gh-pages` branch or use a deploy tool.

Deploy to Netlify

1. Create a Netlify site pointing to this repo and set the build command to `npm run build` and publish directory to `frontend/dist/labourlink-frontend`.
2. For single-page routing to work, add a `_redirects` file in `dist` with `/* /index.html 200` or configure Netlify redirects.
