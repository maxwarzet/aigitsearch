


GitHub Search App (with Anti‑Tamper + Obfuscation)
Search GitHub repositories using natural language with a clean UI. Includes client-side anti-tamper protections and post-build JavaScript obfuscation.

Features
- GitHub search with star-sorted results
- Repository cards: avatar, name, owner, description, stars, forks, language, last updated
- Anti-tamper hardening: blocks F12, Ctrl+Shift+I/J/C/K, Ctrl+U/S/P, right-click, copy/cut/paste; detects DevTools and overlays the page
- Security headers (CSP, X-Frame-Options) added in HTML
- Post-build JS obfuscation for production builds

Requirements
- Node.js 18+ and npm
- Internet access to GitHub API
- Note: The app calls GitHub Search API from the browser without an auth token; heavy usage may hit rate limits

Getting Started

1) Install dependencies
```bash
npm install
```

2) Start development server
```bash
npm run dev
```
- Opens a local dev server (hot reload). Anti-tamper runs, but code is not obfuscated in dev.

3) Production build (with obfuscation)
```bash
npm run build
```
- Builds the app via CRA and runs postbuild obfuscation on build/static/js/**/*.js.

4) Preview production build locally
```bash
npx serve -s build
```
- Serves minified + obfuscated build.

Project Scripts
- npm run dev: React dev server (react-scripts start)
- npm run build: Production build + postbuild obfuscation
- postbuild: node scripts/obfuscate.cjs (automatically run after build)

Code Structure
- public/index.html: Base HTML + security headers + anti-tamper script injection
- public/anti-tamper.js: Client-side protections (keyboard shortcut blocks, DevTools detection, overlay)
- scripts/obfuscate.cjs: Node script to obfuscate build/static/js/*.js with javascript-obfuscator
- src/: React app source (components, hooks, types)

Security & Hardening

Anti-tamper runtime (client-side)
- Location: public/anti-tamper.js
- Blocks common inspection shortcuts (F12, Ctrl+Shift+I/J/C/K, Ctrl+U/S/P), right-click, clipboard events
- Simple DevTools detection; if open, overlays and disables interaction
- Caveat: Client-side defenses can be bypassed by advanced users. Do not ship secrets to the browser.

Content Security Policy (CSP)
- Location: public/index.html
- Restricts sources to self and GitHub API, tightens image/script/style/connect, disallows framing
- Adjust CSP if you add external assets or analytics

Obfuscation
- Location: scripts/obfuscate.cjs
- Runs automatically after build; rewrites JS files under build/static/js
- Options: controlFlowFlattening, deadCodeInjection, stringArrayEncoding, etc.
- Note: Obfuscation increases bundle complexity and may impact performance; adjust options if needed.

Customization

Change app name/metadata
- public/index.html: <title> and meta description

Adjust anti-tamper behavior
- public/anti-tamper.js:
  - Remove or modify blocked shortcuts
  - Tweak overlay message or behavior
  - You can disable during development by commenting out the script tag in public/index.html

Relax CSP for external assets
- public/index.html: Update the meta http-equiv="Content-Security-Policy" tag to include additional domains as needed

Deployment

Vercel (recommended)
- Create a new project from the GitHub repo
- Build command: npm run build
- Output directory: build
- No server required (static SPA)

GitHub Pages
- Build locally: npm run build
- Push the build directory to the gh-pages branch using a tool like gh-pages, or configure your repo Pages to serve from /root and publish the build/ contents accordingly

Troubleshooting
- Rate limiting from GitHub API: The unauthenticated Search API is rate-limited. Consider adding a simple backend proxy that injects a server-side token and rate limits requests. Do not expose tokens in frontend code.
- DevTools overlay triggers unexpectedly: Comment or relax the detection in public/anti-tamper.js.
- Obfuscation issues after build: Temporarily disable postbuild (remove scripts.postbuild in package.json) to isolate problems.

License
- You control the license in your GitHub repository. Add or update a LICENSE file if needed.

Owner
- GitHub: https://github.com/maxwarzet
