import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import metaConfig from "../meta.config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

// Read the built index.html as template
const template = readFileSync(join(distDir, "index.html"), "utf-8");

function generateHtml(title, description) {
  let html = template;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Replace OG meta tags
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${description}" />`
  );

  return html;
}

// Generate HTML for each configured page
for (const [path, meta] of Object.entries(metaConfig)) {
  const html = generateHtml(meta.title, meta.description);

  // Create directory and write index.html
  const outputDir = join(distDir, path);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "index.html"), html);

  console.log(`Generated: ${path}/index.html`);
}

console.log("Meta generation complete!");
