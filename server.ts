import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser with generous limit for large Webnovel chapters
app.use(express.json({ limit: "25mb" }));

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default Seed Presets
const SEED_PROJECTS = [
  {
    id: "lotm-chinese",
    name: "Lord of the Mysteries (CN)",
    description: "Chef-d'œuvre de transmigration ésotérique dans un monde fantastique Victorien.",
    sourceLang: "CN",
    targetLang: "FR",
    createdAt: new Date().toISOString(),
    glossary: [
      { id: "g1", original: "Lin Fan", translation: "Lin Fan", notes: "Le nom réincarné temporairement sous la lueur écarlate." },
      { id: "g2", original: "Klein Moretti", translation: "Klein Moretti", notes: "L'identité principale acquise dans l'Empire de Loen." },
      { id: "g3", original: "true qi", translation: "Qi Originel", notes: "Énergie spirituelle purifiée issue des méridiens célestes." },
      { id: "g4", original: "Spectator", translation: "Spectateur", notes: "La séquence d'éveil divine de la voie de l'esprit." },
      { id: "g5", original: "spirituality", translation: "spiritualité divine", notes: "L'énergie psychique éthérée servant à ressentir l'au-delà." },
      { id: "g6", original: "brass lantern", translation: "lanterne en laiton", notes: "Objet protecteur d'alchimie contre la folie." }
    ],
    chapters: [
      {
        id: "lotm-ch1",
        number: 1,
        title: "La Lune Écarlate d'Orient",
        originalText: `深夜，绯红的月光穿过薄雾，照进房间里。
林凡猛地睁开眼睛，看到四周陌生的欧式古典陈设。他捂着隐隐作痛的头部，心中充满了疑惑。
“这是哪里？我怎么会在这里？”林凡喃喃自语。
作为一位资深的武者，他本能地尝试运转体内的真气，却发现体内的精神力正在朝着一个古怪的方向产生共鸣。
房间的桌子上，摆放着一本古旧的红皮笔记本，以及一盏散发着淡淡黄光的铜煤气灯。
突然，窗外传来了一声低沉 of 乌鸦啼叫，仿佛预示着某种不可名状的存在。`,
        sourceLang: "CN",
        targetLang: "FR",
        status: "pending",
        createdAt: new Date().toISOString()
      },
      {
        id: "lotm-ch2",
        number: 2,
        title: "Le Murmure du Brouillard",
        originalText: `在朦胧的梦境中，林凡感觉自己上升到了一个由无尽灰白雾气组成的神圣城堡之上。
“这就是传说中的神域吗？”他的真气在这里无法施展，但精神力却感到无比亲切。
虚空中悬浮着一个神秘的高背椅。他坐在上面，俯瞰着下方，脑海中响起了一声声悠远的呼唤。
一切的线索，似乎都指向了那本桌子上的红皮笔记本。`,
        sourceLang: "CN",
        targetLang: "FR",
        status: "pending",
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: "coiling-dragon",
    name: "Coiling Dragon (EN)",
    description: "Classic High Fantasy Xianxia translation project.",
    sourceLang: "EN",
    targetLang: "FR",
    createdAt: new Date().toISOString(),
    glossary: [
      { id: "cd1", original: "Linley Baruch", translation: "Linley Baruch", notes: "Protagoniste issu du clan des Guerriers au Sang de Dragon." },
      { id: "cd2", original: "Ring of the Dragon", translation: "Anneau du Dragon", notes: "Artefact mythique de rang divin scellé dans l'argile." },
      { id: "cd3", original: "earth-style magic", translation: "magie tellurique", notes: "Sortilèges et affinités magiques liés à la terre profonde." },
      { id: "cd4", original: "beast", translation: "Créature Magique Sauvage", notes: "Créatures mystiques rôdant dans la chaîne de montagnes." },
      { id: "cd5", original: "martial artist", translation: "Guerrier Champion", notes: "Classe de combat d'élite utilisant la force physique pure." }
    ],
    chapters: [
      {
        id: "cd-ch1",
        number: 1,
        title: "The Coiling Dragon Ring",
        originalText: `Linley Baruch stood on the grass, looking at the ancient castle of his clan. In his hands, he was holding a mysterious black ring shaped like an ancient coiling dragon.
His heart beat quickly. He was a low-level martial artist, but he could feel a trace of earth-style magic leaking out of this ring.
"Is this a divine beast's relic?" Linley muttered, a self-deprecating smile appearing on his face. "Even if it is, with my trash cultivation speed, what can I achieve?"
All of a sudden, a shadow flashed across the sky. A high-level wolf beast howled in the distant misty mountains, creating a deep sense of danger.`,
        sourceLang: "EN",
        targetLang: "FR",
        status: "pending",
        createdAt: new Date().toISOString()
      }
    ]
  }
];

// Load project list from disk, default to seeds if not found
function loadProjects() {
  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(SEED_PROJECTS, null, 2), "utf-8");
    return SEED_PROJECTS;
  }
  try {
    const raw = fs.readFileSync(PROJECTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error loading projects.json:", e);
    return SEED_PROJECTS;
  }
}

// Save project list to disk
function saveProjects(data: any) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// REST endpoints for data persistence
app.get("/api/projects", (req, res) => {
  res.json(loadProjects());
});

app.post("/api/projects", (req, res) => {
  try {
    saveProjects(req.body);
    res.json({ success: true });
  } catch (err: any) {
    console.error("Failed to save projects:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Initialize GoogleGenAI client (will lazy-check key later on use)
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("La variable GEMINI_API_KEY est manquante. Configurez-la dans 'Settings > Secrets'.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Simple health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Helper to chunk large texts to prevent quality/context loss
function chunkText(text: string, maxLength: number = 4000): string[] {
  if (text.length <= maxLength) return [text];
  const paragraphs = text.split(/\n+/);
  const chunks: string[] = [];
  let currentChunk = "";
  
  for (const para of paragraphs) {
    if ((currentChunk + "\n" + para).length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      if (para.length > maxLength) {
        // hard split paragraph if a single one is excessively long
        let temp = para;
        while (temp.length > 0) {
          chunks.push(temp.slice(0, maxLength));
          temp = temp.slice(maxLength);
        }
        currentChunk = "";
      } else {
        currentChunk = para;
      }
    } else {
      currentChunk = currentChunk ? (currentChunk + "\n" + para) : para;
    }
  }
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

// POST endpoint for the multi-stage, robust translation pipeline
app.post("/api/translate", async (req, res): Promise<any> => {
  try {
    const { originalText, sourceLang, glossary, toneStyle, projectId, chapterTitle } = req.body;

    if (!originalText || !originalText.trim()) {
      return res.status(400).json({ error: "Le texte à traduire est requis." });
    }

    const ai = getAiClient();
    const sourceLangName = sourceLang === 'CN' ? 'Chinois' : sourceLang === 'KR' ? 'Coréen' : 'Anglais';
    
    let activeGlossary = Array.isArray(glossary) ? [...glossary] : [];
    const detectedNewEntries: any[] = [];

    // --- AUTOMATIC LORE GLOSSARY ENRICHMENT STEP (BACKGROUND AUTO EXTRACTOR) ---
    try {
      const existingOriginals = activeGlossary.map((g: any) => g.original.toLowerCase());
      const existingListText = existingOriginals.length > 0 
        ? existingOriginals.join(", ") 
        : "Aucun terme enregistré.";

      const extractionPrompt = `Tu es un grand traducteur de Webnovels et un lexicographe spécialisé dans le genre fantastique (Xianxia/Wuxia/SciFi/Victorien-Gothique/Fantasy Coréenne).
Analyse le texte original ci-dessous (${sourceLangName}) et repère s'il contient des termes propres au LORE, au WORLD-BUILDING ou à l'esprit du roman (ex: noms propres de personnages récurrents, objets magiques ou technologiques, sorts/techniques martiales, sectes/clans, grades de culture de force, lieux singuliers) qui ne figurent PAS dans la liste suivante des originaux déjà connus :
[${existingListText}]

Pour chaque terme digne d'un glossaire de lore identifié dans le texte, fournis sa traduction française la plus élégante et une courte note explicative (définition ou importance) pour le lecteur.

Règles :
1. N'extrais pas de vocabulaire commun (comme "maison", "route", "ciel", "épée" simple, "amour"). N'extrais que des termes à fort contenu de Lore, des noms propres, ou des néologismes fictifs.
2. Limite-toi aux termes les plus importants et pertinents (maximum 6 termes).
3. Retourne ta réponse STRICTEMENT sous forme d'un tableau JSON (sans markdown ni explication), comme ceci :
[
  {
    "original": "terme original exact",
    "translation": "Traduction élégante",
    "notes": "Définition courte en français"
  }
]
Si aucun nouveau terme de lore digne d'être enregistré n'est identifié, retourne exactement un tableau vide : []`;

      const extractionResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: extractionPrompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        }
      });

      const rawText = extractionResponse.text?.trim() || "[]";
      let parsedNewEntries = [];
      try {
        parsedNewEntries = JSON.parse(rawText);
      } catch (e) {
        console.error("Failed to parse extracted glossary terms JSON:", e);
      }

      if (Array.isArray(parsedNewEntries) && parsedNewEntries.length > 0) {
        for (const entry of parsedNewEntries) {
          if (entry.original && entry.translation) {
            const origLower = entry.original.trim().toLowerCase();
            if (!existingOriginals.includes(origLower) && origLower.length > 1) {
              const uniqueId = `g-auto-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
              const validatedEntry = {
                id: uniqueId,
                original: entry.original.trim(),
                translation: entry.translation.trim(),
                notes: (entry.notes || "").trim()
              };
              detectedNewEntries.push(validatedEntry);
              activeGlossary.push(validatedEntry);
              existingOriginals.push(origLower);
            }
          }
        }

        // If projectId is provided, persist these back to projects.json permanently
        if (projectId) {
          const projects = loadProjects();
          const projIdx = projects.findIndex((p: any) => p.id === projectId);
          if (projIdx !== -1) {
            const project = projects[projIdx];
            if (!project.glossary) project.glossary = [];
            
            for (const entry of detectedNewEntries) {
              if (!project.glossary.some((g: any) => g.original.toLowerCase() === entry.original.toLowerCase())) {
                project.glossary.push(entry);
              }
            }
            projects[projIdx] = project;
            saveProjects(projects);
            console.log(`[Auto-Enrichment] Appended ${detectedNewEntries.length} new lore terms to project ${projectId} on disk.`);
          }
        }
      }
    } catch (err) {
      console.error("Error during background glossary enrichment:", err);
    }

    // --- CHAPTER TITLE TRANSLATION STEP ---
    let translatedTitle = "";
    if (chapterTitle && chapterTitle.trim()) {
      try {
        const glossaryForTitle = activeGlossary && activeGlossary.length > 0
          ? activeGlossary.map((g: any) => `- Terme Original: "${g.original}" -> Traduction: "${g.translation}"`).join("\n")
          : "Aucun.";
          
        const titlePrompt = `Tu es un grand traducteur littéraire expert en Webnovels ${sourceLangName} vers le Français.
Traduis le titre de chapitre suivant en français de la façon la plus naturelle, fluide et poétique possible pour un roman fantastique.
Respecte scrupuleusement les termes du glossaire ci-dessous s'ils apparaissent dans le titre.

Glossaire de Lore :
${glossaryForTitle}

Titre original à traduire : "${chapterTitle.trim()}"

Génère en sortie UNIQUEMENT le titre traduit final en français, sans guillemets d'encadrement, sans explications, sans markdown de bloc de code.`;

        const titleResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: titlePrompt,
          config: {
            temperature: 0.2,
          }
        });
        translatedTitle = titleResponse.text?.trim()?.replace(/^["']|["']$/g, '') || chapterTitle;
        console.log(`[Title Translation] Translated original "${chapterTitle}" to "${translatedTitle}"`);
      } catch (e) {
        console.error("Failed to translate chapter title:", e);
        translatedTitle = chapterTitle;
      }
    }

    const glossaryText = activeGlossary && activeGlossary.length > 0
      ? activeGlossary.map((g: any) => `- Terme Original: "${g.original}" -> Traduction à utiliser impérativement: "${g.translation}" ${g.notes ? `(Note: ${g.notes})` : ""}`).join("\n")
      : "Aucun terme spécifique dans le glossaire pour ce chapitre.";

    const chunks = chunkText(originalText, 4500);
    const stylePreference = toneStyle || "fluide, naturelle, de haute qualité littéraire, respectant l'époque ou le lore du webnovel (familière ou soutenue selon le dialogue).";

    const results: Array<{
      chunkIndex: number;
      draft: string;
      validation: string;
      final: string;
    }> = [];

    // Process chunks sequentially to keep the translation cohesive and avoid API rate limits
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      // --- STAGE 0 : GLOSSARY IDENTIFICATION & MAPPING (PRE-PIPELINE) ---
      const stage0Prompt = `Tu es un cartographe de terminologie littéraire et de lore de Webnovels ${sourceLangName}.
Analyse attentivement le segment de texte original ci-dessous et identifie TOUS les termes du glossaire officiel du projet qui y apparaissent sous quelque forme que ce soit (variations de casse, de ponctuation ou de genre/pluriel).

Glossaire officiel disponible :
${glossaryText}

Texte original du segment à examiner :
"""
${chunk}
"""

Instructions capitales :
Dresse uniquement et simplement la liste d'association des termes effectivement détectés dans ce texte original, au format exact :
- "Terme original trouvé" -> "Traduction impérative" (Note ou description de lore)

S'il n'y a aucun terme du glossaire détecté dans ce fragment de texte, réponds exactement : "Aucun terme du glossaire n'a été repéré dans ce segment."

Ne fournis aucune explication supplémentaire, aucun bla-bla d'introduction, et aucun bloc de code Markdown.`;

      const stage0Response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: stage0Prompt,
        config: {
          systemInstruction: "Tu es un extracteur de terminologie et de lore de roman. Tu réponds exclusivement de façon concise en respectant le format demandé.",
          temperature: 0.1,
        }
      });
      const mappingText = stage0Response.text?.trim() || "Aucun terme du glossaire n'a été repéré dans ce segment.";

      // --- STAGE 1 : FIRST DRAFT ---
      const stage1Prompt = `Tu es un traducteur expert spécialisé dans la traduction de Webnovels du ${sourceLangName} vers le Français.
Voici ta première tâche : produire un premier jet de traduction (Draft) extrêmement fidèle pour le texte ci-dessous.

Règles impératives :
1. Respecte SCRUPULEUSEMENT le glossaire de lore suivant :
${glossaryText}

Cartographie spécifique des termes identifiés dans ce segment précis (à appliquer en priorité absolue) :
${mappingText}

2. Style attendu : ${stylePreference}
3. Garde exactement la même mise en forme, sauts de paragraphe, et structures textuelles. Ne résume pas, ne saute aucune ligne.

Texte original à traduire :
"""
${chunk}
"""

Génère UNIQUEMENT la traduction brute pour le premier jet. Pas de blabla, de notes de traducteur ou de code blocs Markdown.`;

      const stage1Response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: stage1Prompt,
        config: {
          systemInstruction: "Tu es un traducteur de romans qualifié. Tu réponds exclusivement en fournissant la traduction demandée.",
          temperature: 0.3,
        }
      });
      const draftText = stage1Response.text?.trim() || "";

      // --- STAGE 2 : COMPARATIVE VALIDATION (ANTI-HALLUCINATION) ---
      const stage2Prompt = `Tu es une IA de relecture académique et de validation d'alignement bilingue.
L'IA de traduction a produit un premier jet de traduction. Ta tâche consiste à comparer TRÈS rigoureusement le texte original et le premier jet pour t'assurer qu'il n'y a AUCUNE hallucination, AUCUN oubli (paragraphe omis), et que le glossaire a été respecté.

Glossaire requis :
${glossaryText}

Cartographie spécifique des termes identifiés à l'origine dans ce segment :
${mappingText}

Texte original :
"""
${chunk}
"""

Premier jet de traduction :
"""
${draftText}
"""

Instructions d'analyse :
1. Examine ligne après ligne. Si une phrase a été sautée, rajoute sa traduction.
2. Si un paragraphe a été inventé ou sur-interprété par l'IA (hallucination, adaptation excessive), retire-le ou corrige-le pour coller strictement au sens authentique original.
3. Vérifie que chaque terme présent dans la Cartographie Spécifique a été correctement appliqué. Remplace les termes erronés par leur traduction de glossaire correcte.
4. Produis la traduction réalignée et corrigée (Correction).

Génère en sortie UNIQUEMENT la traduction corrigée et réalignée de ce segment, sans autres commentaires introductifs ou conclusifs.`;

      const stage2Response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: stage2Prompt,
        config: {
          systemInstruction: "Tu es un relecteur de traduction bilingue pointilleux. Tu ne retires aucun fait réel et n'en ajoutes aucun.",
          temperature: 0.2,
        }
      });
      const validatedText = stage2Response.text?.trim() || "";

      // --- STAGE 3 : STYLISTIC POLISH (LITERARY REFINEMENT) ---
      const stage3Prompt = `Tu es un correcteur littéraire de romans de fantasy et d'aventures de premier rang en langue française.
Ta tâche est de prendre la traduction réalignée et d'en sublimer le style en français sans jamais altérer le sens d'origine, ni les noms de personnages, ni le lore ou le glossaire.

Traduction alignée de base :
"""
${validatedText}
"""

Objectif stylistique :
1. Rends les dialogues vivants et naturels. Les expressions bizarres du chinois (ex: "manger du vinaigre" pour la jalousie, "ne pas savoir s'il faut rire ou pleurer", "ne pas donner de visage") doivent être adaptées de manière fluide et élégante si nécessaire, tout en gardant l'originalité poétique du genre (Xianxia/Wuxia/SciFi).
2. Assure-toi que les blagues, sarcasmes, intonations tragiques ou comiques se lisent parfaitement en français.
3. L'écriture doit être rythmée et agréable, digne d'une publication finale d'un Webnovel populaire.

Règle absolue : Retourne UNIQUEMENT le texte final poli en français. Aucun message bilingue, aucune note explicative de traducteur bilingue, aucun bloc de code de type \`\`\`.`;

      const stage3Response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: stage3Prompt,
        config: {
          systemInstruction: "Tu es un auteur de roman français de fantasy. Tu embellis le style sans dénaturer le texte.",
          temperature: 0.5,
        }
      });
      const polishedText = stage3Response.text?.trim() || "";

      results.push({
        chunkIndex: i,
        draft: draftText,
        validation: validatedText,
        final: polishedText
      });
    }

    // Combine final translations
    const finalDraft = results.map(r => r.draft).join("\n\n");
    const finalPolishedTranslation = results.map(r => r.final).join("\n\n");

    res.json({
      success: true,
      draftText: finalDraft,
      validationNotes: `Validé avec succès sur ${chunks.length} segments. Évitement rigoureux des hallucinations activé.`,
      translatedText: finalPolishedTranslation,
      translatedTitle: translatedTitle,
      newGlossaryEntries: detectedNewEntries,
    });

  } catch (error: any) {
    console.error("Translation Pipeline Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Une erreur inconnue est survenue lors de la traduction."
    });
  }
});

// POST endpoint to auto-translate and define glossary terms with AI
app.post("/api/glossary/auto-fill", async (req, res): Promise<any> => {
  try {
    const { original, sourceLang } = req.body;
    if (!original || !original.trim()) {
      return res.status(400).json({ error: "Le terme original est requis." });
    }

    const ai = getAiClient();
    const sourceLangName = sourceLang === 'CN' ? 'Chinois' : sourceLang === 'KR' ? 'Coréen' : 'Anglais';
    const prompt = `Tu es un expert en Webnovels ${sourceLangName} et en traduction littéraire.
On te fournit le terme original suivant tiré du lore d'un Webnovel : "${original}"
Ta tâche est de trouver sa meilleure traduction en français pour conserver une cohérence parfaite de la traduction littéraire, et de fournir une courte note explicative (définition ou utilité de ce concept dans le lore).

Retourne ta réponse UNIQUEMENT sous la forme d'un objet JSON contenant exactement ces deux clés (sans fioriture Markdown, sans blocs de code, juste du JSON brut) :
{
  "translation": "La traduction française préconisée (ex: 'Qi Originel', 'Klein Moretti')",
  "notes": "Une brève explication bilingue du concept en français (ex: 'Le nom spirituel réincarné du héros')"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json({
      success: true,
      translation: parsedData.translation || original,
      notes: parsedData.notes || ""
    });
  } catch (error: any) {
    console.error("Glossary Auto-fill Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Impossible d'autogénérer la traduction du terme."
    });
  }
});

// Serve frontend build static files in production or hook Vite in dev
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
