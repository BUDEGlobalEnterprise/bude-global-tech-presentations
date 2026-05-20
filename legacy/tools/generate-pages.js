const fs = require('fs');
const path = require('path');

// Mock PRESENTATIONS_CONFIG since we can't easily import from .js without a bundler/module system
// We will read the presentations.js file and extract the config using regex for simplicity in this script
const presentationsFile = fs.readFileSync(path.join(__dirname, '../presentations.js'), 'utf8');
const configMatch = presentationsFile.match(/const PRESENTATIONS_CONFIG = (\[[\s\S]*?\]);/);

if (!configMatch) {
    console.error('Could not find PRESENTATIONS_CONFIG in presentations.js');
    process.exit(1);
}

// Safely evaluate the config (it's a static array)
let PRESENTATIONS_CONFIG;
try {
    // Basic cleanup for eval (remove comments and trailing commas)
    const cleanedConfig = configMatch[1]
        .replace(/\/\/.*$/gm, '')
        .replace(/,(\s*[\]}])/g, '$1');
    PRESENTATIONS_CONFIG = eval(cleanedConfig);
} catch (e) {
    console.error('Error parsing PRESENTATIONS_CONFIG:', e);
    process.exit(1);
}

const templatePath = path.join(__dirname, '../index.html');
const template = fs.readFileSync(templatePath, 'utf8');

const outputDir = path.join(__dirname, '../p');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Generating pages for ${PRESENTATIONS_CONFIG.length} presentations...`);

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://ppt.budeglobal.in</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`;

PRESENTATIONS_CONFIG.forEach(pres => {
    // Generate slug from file name or title
    const filename = path.basename(pres.file, '.json');
    const slug = filename;
    const url = `https://ppt.budeglobal.inp/${slug}.html`;

    // Modern SEO tags
    let pageContent = template;
    
    // Replace Title
    const newTitle = `${pres.title} | Bude Global Tech Presentations`;
    pageContent = pageContent.replace(/<title>[\s\S]*?<\/title>/, `<title>${newTitle}</title>`);
    
    // Replace Description
    const newDesc = pres.description;
    pageContent = pageContent.replace(/name="description"\s+content=".*?"/, `name="description" content="${newDesc}"`);
    
    // Replace Keywords
    const newKeywords = pres.keywords ? pres.keywords.join(', ') : '';
    pageContent = pageContent.replace(/name="keywords"\s+content=".*?"/, `name="keywords" content="${newKeywords}"`);
    
    // Replace OG Tags
    pageContent = pageContent.replace(/property="og:title"\s+content=".*?"/, `property="og:title" content="${newTitle}"`);
    pageContent = pageContent.replace(/property="og:description"\s+content=".*?"/, `property="og:description" content="${newDesc}"`);
    pageContent = pageContent.replace(/property="og:url"\s+content=".*?"/, `property="og:url" content="${url}"`);
    
    // Inject initial presentation loading script
    const injection = `
    <script>
      window.INITIAL_PRESENTATION = "${pres.file}";
      // Adjust relative paths for scripts and links since we are in /p/
      document.addEventListener('DOMContentLoaded', () => {
          const updatePaths = (selector, attr) => {
              document.querySelectorAll(selector).forEach(el => {
                  const val = el.getAttribute(attr);
                  if (val && !val.startsWith('http') && !val.startsWith('/') && !val.startsWith('.')) {
                      el.setAttribute(attr, '../' + val);
                  }
              });
          };
          updatePaths('link[rel="stylesheet"]', 'href');
          updatePaths('script[src]', 'src');
          updatePaths('img[src]', 'src');
          updatePaths('a[href]', 'href');
      });
    </script>
    `;
    
    pageContent = pageContent.replace('</head>', `${injection}\n</head>`);

    fs.writeFileSync(path.join(outputDir, `${slug}.html`), pageContent);
    // console.log(`Generated: p/${slug}.html`);

    sitemap += `
    <url>
        <loc>${url}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
});

sitemap += `\n</urlset>`;
fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), sitemap);

console.log('Static pages and sitemap generation complete!');
