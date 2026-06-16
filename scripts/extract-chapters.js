import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const PROJECTS_FILE = path.join(process.cwd(), 'data', 'projects.json');
const PUBLIC_PROJECTS_FILE = path.join(process.cwd(), 'public', 'data', 'projects.json');

// Decode special HTML characters
function decodeHtml(html) {
  return html
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&hellip;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

// Strip remaining HTML tags
function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').trim();
}

// Fetch a single chapter using curl.exe
async function fetchChapter(chapNumber) {
  const url = `https://novelfull.com/nano-machine-retranslated-version/chapter-${chapNumber}.html`;
  
  // Using curl.exe directly to mimic browser and bypass basic Cloudflare checks
  const cmd = `curl.exe -s -A "${USER_AGENT}" "${url}"`;
  const html = execSync(cmd, { encoding: 'utf-8', maxBuffer: 15 * 1024 * 1024 });
  
  if (!html || html.trim().length === 0) {
    throw new Error(`Empty response`);
  }
  
  if (html.includes('403 Forbidden')) {
    throw new Error(`HTTP 403 Forbidden (Cloudflare block)`);
  }

  // Extract Title
  let title = `Chapter ${chapNumber}`;
  const titleMatch = html.match(/<h3>Chapter \d+:\s*(.*?)<\/h3>/i);
  if (titleMatch) {
    title = `Chapter ${chapNumber}: ${decodeHtml(titleMatch[1].trim())}`;
  } else {
    const backupTitleMatch = html.match(/<a class="chapter-title".*?title="(.*?)">/i);
    if (backupTitleMatch) {
      title = decodeHtml(backupTitleMatch[1].trim());
    }
  }
  
  // Extract Content
  const contentMatch = html.match(/<div[^>]*id="chapter-content"[^>]*>([\s\S]*?)<\/div>\s*<hr/i) || 
                       html.match(/<div[^>]*class="chapter-c"[^>]*>([\s\S]*?)<\/div>/i);
                       
  if (!contentMatch) {
    throw new Error(`Could not find chapter content container`);
  }
  
  const contentBlock = contentMatch[1];
  const pRegex = /<p>([\s\S]*?)<\/p>/gi;
  let pMatch;
  const paragraphs = [];
  
  while ((pMatch = pRegex.exec(contentBlock)) !== null) {
    const rawP = pMatch[1];
    if (rawP.includes('<iframe') || rawP.includes('ads-holder') || rawP.includes('toggle-nav-open')) {
      continue;
    }
    const cleanP = stripTags(decodeHtml(rawP));
    if (cleanP.length > 0 && !cleanP.startsWith('Chapter ' + chapNumber)) {
      paragraphs.push(cleanP);
    }
  }
  
  if (paragraphs.length === 0) {
    const cleanBlock = stripTags(decodeHtml(contentBlock));
    const lines = cleanBlock.split(/\n+/).map(l => l.trim()).filter(l => l.length > 0);
    paragraphs.push(...lines);
  }
  
  return {
    title,
    text: paragraphs.join('\n\n')
  };
}

async function run() {
  // Get CLI arguments: node extract-chapters.js <startChapter> <endChapter>
  const args = process.argv.slice(2);
  const startChapter = parseInt(args[0]) || 4;
  const endChapter = parseInt(args[1]) || 15; // default batch size to avoid long lockups
  
  console.log(`=== Extraction de Nanomachine (Chapitres ${startChapter} à ${endChapter}) ===`);

  if (!fs.existsSync(PROJECTS_FILE)) {
    console.error(`Fichier introuvable : ${PROJECTS_FILE}`);
    return;
  }

  const rawProjects = fs.readFileSync(PROJECTS_FILE, 'utf-8');
  const projects = JSON.parse(rawProjects);
  
  const nanoProject = projects.find(p => p.name.toLowerCase().includes('nano'));
  if (!nanoProject) {
    console.error("Projet 'Nanomachine' introuvable dans projects.json");
    return;
  }
  
  let successCount = 0;
  
  for (let chap = startChapter; chap <= endChapter; chap++) {
    // Check if chapter already exists
    const exists = nanoProject.chapters.some(c => c.number === chap);
    if (exists) {
      console.log(`[Chapitre ${chap}] Déjà présent. Passé.`);
      continue;
    }
    
    try {
      const { title, text } = await fetchChapter(chap);
      const newChapter = {
        id: `ch-auto-${Date.now()}-${chap}`,
        number: chap,
        title: title,
        originalText: text,
        sourceLang: "EN",
        targetLang: "FR",
        status: "pending",
        createdAt: new Date().toISOString()
      };
      
      nanoProject.chapters.push(newChapter);
      // Sort chapters by number
      nanoProject.chapters.sort((a, b) => a.number - b.number);
      // Write back to projects.json incrementally
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
      try {
        fs.writeFileSync(PUBLIC_PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
      } catch (e) {}
      
      console.log(`[Chapitre ${chap}] Ajouté et sauvegardé avec succès : ${title}`);
      successCount++;
      
      // Delay to be polite with the server (prevents IP rate-limiting)
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`[Chapitre ${chap}] Échec de récupération : ${e.message}`);
    }
  }
  
  if (successCount > 0) {
    // Sort chapters by number
    nanoProject.chapters.sort((a, b) => a.number - b.number);
    // Write back to projects.json
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    try {
      fs.writeFileSync(PUBLIC_PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    } catch (e) {}
    console.log(`\nSauvegarde effectuée ! ${successCount} nouveaux chapitres ajoutés.`);
  } else {
    console.log("\nAucun nouveau chapitre n'a été ajouté.");
  }
}

run();
