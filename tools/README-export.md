Export the Reveal deck to a PDF using Puppeteer

This script runs a small static server, opens the presentation in headless Chromium, navigates each slide, screenshots the `.reveal` container, and assembles a single PDF.

Requirements
- Node.js (14+ recommended)

Install dependencies (run once):

```powershell
npm install puppeteer express pdf-lib
```

Run the exporter:

```powershell
node tools/export-deck.js 3000
```

The script will serve the repository root on port 3000, open `index.html`, capture slides, and write `exported-deck-<timestamp>.pdf` to the current directory.

Notes
- If your slides include remote images that require CORS, run a local server or ensure the assets are accessible.
- Adjust viewport size and deviceScaleFactor in the script for higher/lower resolution captures.
- This avoids in-browser html2canvas issues by using real Chromium to render and capture slides.