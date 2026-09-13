import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const PROJECTS_FILE = path.join(process.cwd(), 'data', 'projects.json');
const PUBLIC_PROJECTS_FILE = path.join(process.cwd(), 'public', 'data', 'projects.json');

function decodeHtml(html) {
  return html
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&#x27;/g, "'")
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

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').trim();
}

function fetchChapter(num) {
  const url = `https://www.wuxiaworld.eu/chapter/descent-of-the-demon-god-${num}`;
  const cmd = `curl.exe -s -L -A "${USER_AGENT}" "${url}"`;
  const html = execSync(cmd, { encoding: 'utf-8', maxBuffer: 15 * 1024 * 1024 });

  const marker = 'id="chapterText"';
  const parts = html.split(marker);
  if (parts.length <= 1) {
    throw new Error('No chapter content container found');
  }

  const paragraphs = [];
  for (let i = 1; i < parts.length; i++) {
    const raw = parts[i].split('</div>')[0].replace(/^[^>]*>/, '');
    const clean = stripTags(decodeHtml(raw));
    if (clean.length > 0) {
      if (clean.includes('This is the last chapter of Descent of the Demon God') ||
          clean.includes('Descent of the Demon God is the first novel we translated') ||
          clean.includes('Big thanks to all of our supporters')) {
        continue;
      }
      paragraphs.push(clean);
    }
  }

  if (paragraphs.length === 0) {
    throw new Error('No paragraphs extracted');
  }

  let title = `Chapter ${num}`;
  if (paragraphs[0].toLowerCase().startsWith('chapter')) {
    title = paragraphs[0];
    paragraphs.shift();
  }

  return {
    title,
    text: paragraphs.join('\n\n')
  };
}

async function run() {
  const args = process.argv.slice(2);
  const startChapter = parseInt(args[0]) || 1;
  const endChapter = parseInt(args[1]) || 242;

  console.log(`=== Extraction de Descent of the Demon God (Chapitres ${startChapter} à ${endChapter}) ===`);

  if (!fs.existsSync(PROJECTS_FILE)) {
    console.error(`Fichier introuvable: ${PROJECTS_FILE}`);
    return;
  }

  const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
  let dgProject = projects.find(p => p.id === 'descent-of-the-demon-god' || p.name.toLowerCase().includes('descent of the demon god'));

  if (!dgProject) {
    console.log("Projet non trouvé. Création du projet 'Descent of the Demon God'...");
    const nanoProject = projects.find(p => p.name.toLowerCase().includes('nano'));
    const initialGlossary = nanoProject && Array.isArray(nanoProject.glossary) 
      ? JSON.parse(JSON.stringify(nanoProject.glossary)) 
      : [];

    dgProject = {
      id: 'descent-of-the-demon-god',
      name: 'Descent of the Demon God',
      sourceLang: 'EN',
      targetLang: 'FR',
      glossary: initialGlossary,
      chapters: []
    };
    projects.push(dgProject);
  }

  let successCount = 0;

  for (let chap = startChapter; chap <= endChapter; chap++) {
    const exists = dgProject.chapters.some(c => c.number === chap);
    if (exists) {
      console.log(`[Chapitre ${chap}] Déjà extrait. Ignoré.`);
      continue;
    }

    try {
      const { title, text } = fetchChapter(chap);
      const newChapter = {
        id: `dg-ch-${chap}`,
        number: chap,
        title: title,
        originalText: text,
        sourceLang: 'EN',
        targetLang: 'FR',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      dgProject.chapters.push(newChapter);
      dgProject.chapters.sort((a, b) => a.number - b.number);

      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
      try {
        fs.writeFileSync(PUBLIC_PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
      } catch (e) {}

      console.log(`[Chapitre ${chap}/${endChapter}] OK: ${title} (${text.length} chars)`);
      successCount++;

      // Pause de 300ms pour préserver le serveur
      await new Promise(r => setTimeout(r, 300));
    } catch (e) {
      console.error(`[Chapitre ${chap}] Erreur: ${e.message}`);
    }
  }

  console.log(`\n=== Terminé ! ${successCount} chapitres extraits et sauvegardés. ===`);
}

run();