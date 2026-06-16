import React, { useState, useEffect } from "react";
import { 
  Sparkles, BookOpen, Layers, RefreshCw, 
  Check, AlertCircle, Bookmark, Compass, Moon, Sun, Feather, Hammer
} from "lucide-react";
import { WebnovelProject, GlossaryEntry, Chapter } from "./types";
import ProjectManager from "./components/ProjectManager";
import GlossaryPanel from "./components/GlossaryPanel";
import ChapterWorkspace from "./components/ChapterWorkspace";
import BookReader from "./components/BookReader";

// PRESETS RESTORATION SEEDS
const SEED_PROJECTS: WebnovelProject[] = [
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
突然，窗外传来了一声低沉的乌鸦啼叫，仿佛预示着某种不可名状的存在。`,
        sourceLang: "CN",
        targetLang: "FR",
        status: "done",
        translatedText: `Dans la nuit profonde, la lumière écarlate de la lune traversa la fine brume, se déversant doucement dans la pièce.
Lin Fan ouvrit brusquement les yeux. Partout autour de lui, il aperçut un arrangement étrange de meubles européens classiques et anciens. Tenant son front qui battait d'une vive douleur sourde, son cœur se remplit de perplexité.
« Où suis-je ? Comment me suis-je retrouvé ici ? » murmura doucement Lin Fan.
En tant qu'artiste martial émérite, il tenta instinctivement de faire circuler son Qi Originel au sein de ses méridiens. Cependant, il s'aperçut avec stupéfaction que sa spiritualité divine résonnait et dérivait selon un axe cosmique tout à fait insolite.
Sur la table de bureau en acajou de la pièce, trônaient un vieux carnet de cuir rouge usé ainsi qu'une lanterne en laiton diffusant une pâle mais chaleureuse clarté de gaz jaunâtre.
Soudain, un croassement de corbeau, bas et lourd, résonna depuis le rebord de la fenêtre, comme s'il annonçait le réveil imminent d'une indicible entité éthérée.`,
        validationNotes: "Terminologie vérifiée à 100% : Lin Fan, Qi Originel, spiritualité divine, lanterne en laiton sont tous traduits fidèlement.",
        createdAt: new Date().toISOString()
      },
      {
        id: "lotm-ch2",
        number: 2,
        title: "Le Murmure du Brouillard",
        originalText: `在朦胧的梦境中，林凡感觉自己上升到了一个由无尽灰白雾气组成的神圣城堡之上。
“这就是传说中的神域吗？”梦境中，林凡喃喃自语。
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
      { id: "cd2", original: "Ring of the Dragon", translation: "Anneau du Dragon Enroulé", notes: "Artefact mythique de rang divin scellé dans l'argile." },
      { id: "cd3", original: "earth-style magic", translation: "magie tellurique", notes: "Sortilèges et affinités magiques liés à la terre profonde." },
      { id: "cd4", original: "beast", translation: "Créature Magique Sauvage", notes: "Créatures mystiques rôdant dans la chaîne de montagnes." },
      { id: "cd5", original: "martial artist", translation: "Guerrier Champion", notes: "Classe de combat d'élite utilisant la force physique pure." }
    ],
    chapters: [
      {
        id: "cd-ch1",
        number: 1,
        title: "L'Anneau du Dragon Enroulé",
        originalText: `Linley Baruch stood on the grass, looking at the ancient castle of his clan. In his hands, he was holding a mysterious black ring shaped like an ancient coiling dragon.
His heart beat quickly. He was a low-level martial artist, but he could feel a trace of earth-style magic leaking out of this ring.
"Is this a divine beast's relic?" Linley muttered, a self-deprecating smile appearing on his face. "Even if it is, with my trash cultivation speed, what can I achieve?"
All of a sudden, a shadow flashed across the sky. A high-level wolf beast howled in the distant misty mountains, creating a deep sense of danger.`,
        sourceLang: "EN",
        targetLang: "FR",
        status: "done",
        translatedText: `Linley Baruch se tenait debout sur l'herbe tendre, contemplant le domaine féodal et le château décrépit de son clan. Entre ses doigts tremblants, il tenait un anneau sculpté de jais sombre, arborant la forme d'un dragon enroulé ancestral.
Son cœur battait à tout rompre. Bien qu'il ne fût encore qu'un Guerrier Champion de humble rang, il percevait distinctement des effluves de magie tellurique s'échapper de ce minuscule bijou.
« S'agirait-il du vestige d'une bête divine originelle ? » murmura Linley dans sa barbe, un sourire d'auto-dérision étirant ses lèvres. « Mais quand bien même ce serait le cas... Avec ma célérité d'entraînement misérable, à quoi puis-je espérer parvenir ? »
Tout à coup, une ombre fugitive fendit la voûte céleste. Un hurlement sinistre de loup magique sauvage résonna depuis la haute brume des montagnes lointaines, instillant un profond frisson dans l'atmosphère.`,
        createdAt: new Date().toISOString()
      }
    ]
  }
];

export default function App() {
  const [projects, setProjects] = useState<WebnovelProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [healthStatus, setHealthStatus] = useState<{ checked: boolean; active: boolean }>({ checked: false, active: false });

  // Main high-level tabs: "traduction" or "lecture"
  const [activeTab, setActiveTab] = useState<"traduction" | "lecture">("traduction");

  // Night Mode core state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("night_mode_active") === "true";
  });

  // Read status tracking
  const [readChapterIds, setReadChapterIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("scriptorium_read_chapters");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleToggleRead = (chapterId: string) => {
    setReadChapterIds(prev => {
      const next = prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId];
      localStorage.setItem("scriptorium_read_chapters", JSON.stringify(next));
      return next;
    });
  };

  // Deep routing via URL Hash change & initialization
  useEffect(() => {
    if (projects.length === 0) return;

    const parseHashAndApply = () => {
      const hash = window.location.hash.substring(1);
      if (!hash) return;

      const params = new URLSearchParams(hash);
      const tabParam = params.get("tab");
      const projectParam = params.get("project");
      const chapterParam = params.get("chapter");

      if (tabParam === "traduction" || tabParam === "lecture") {
        setActiveTab(tabParam);
      }

      if (projectParam) {
        const foundProj = projects.find(p => p.id === projectParam);
        if (foundProj) {
          setSelectedProjectId(projectParam);
          if (chapterParam) {
            const foundCh = foundProj.chapters.find(c => c.id === chapterParam);
            if (foundCh) {
              setSelectedChapterId(chapterParam);
            }
          }
        }
      }
    };

    // Run once on load/active projects populate
    parseHashAndApply();

    // Listen to hash changes
    window.addEventListener("hashchange", parseHashAndApply);
    return () => window.removeEventListener("hashchange", parseHashAndApply);
  }, [projects]);

  // Synchronize state back onto URL hash seamlessly
  useEffect(() => {
    if (projects.length === 0) return;

    const hashParams = new URLSearchParams();
    hashParams.set("tab", activeTab);
    hashParams.set("project", selectedProjectId);
    if (selectedChapterId) {
      hashParams.set("chapter", selectedChapterId);
    }

    const nextHash = `#${hashParams.toString()}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [activeTab, selectedProjectId, selectedChapterId, projects]);

  // Load projects from server disk on mount
  useEffect(() => {
    fetch("/api/projects")
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          setProjects(data);
          setSelectedProjectId(data[0].id);
          const activeProj = data[0];
          if (activeProj && activeProj.chapters && activeProj.chapters.length > 0) {
            setSelectedChapterId(activeProj.chapters[0].id);
          }
        } else {
          // If empty, fall back to seed projects
          saveToStorage(SEED_PROJECTS);
          setSelectedProjectId(SEED_PROJECTS[0].id);
          if (SEED_PROJECTS[0].chapters && SEED_PROJECTS[0].chapters.length > 0) {
            setSelectedChapterId(SEED_PROJECTS[0].chapters[0].id);
          }
        }
      })
      .catch((e) => {
        console.error("Failed fetching projects from disk:", e);
        // Fall back to seed projects in local-state memory
        setProjects(SEED_PROJECTS);
        setSelectedProjectId(SEED_PROJECTS[0].id);
        if (SEED_PROJECTS[0].chapters.length > 0) {
          setSelectedChapterId(SEED_PROJECTS[0].chapters[0].id);
        }
      });

    // Verify Backend connection
    fetch("/api/health")
      .then(r => r.json())
      .then(data => {
        setHealthStatus({ checked: true, active: data.hasApiKey });
      })
      .catch(() => {
        setHealthStatus({ checked: true, active: false });
      });
  }, []);

  const saveToStorage = (updatedProjects: WebnovelProject[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("novel_translator_projects", JSON.stringify(updatedProjects));
    
    // Save to server's projects.json disk
    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProjects)
    })
    .then(r => r.json())
    .then(data => {
      if (!data.success) {
        console.error("Failed saving to disk file:", data.error);
      }
    })
    .catch(err => {
      console.error("Failed writing projects file:", err);
    });
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem("night_mode_active", next ? "true" : "false");
      return next;
    });
  };

  const activeProject = projects.find(p => p.id === selectedProjectId);

  // Project Deletion
  const handleDeleteProject = (projectId: string) => {
    if (projects.length <= 1) {
      alert("Vous devez garder au moins un Roman actif dans votre bibliothèque.");
      return;
    }
    const currentProj = projects.find(p => p.id === projectId);
    if (!currentProj) return;

    if (window.confirm(`Voulez-vous vraiment supprimer définitivement le Roman "${currentProj.name}" et tous ses termes de lore ainsi que ses chapitres ?`)) {
      const updated = projects.filter(p => p.id !== projectId);
      saveToStorage(updated);
      
      const nextProj = updated[0];
      setSelectedProjectId(nextProj.id);
      if (nextProj.chapters && nextProj.chapters.length > 0) {
        setSelectedChapterId(nextProj.chapters[0].id);
      } else {
        setSelectedChapterId(null);
      }
    }
  };

  // Chapter Deletion
  const handleDeleteChapter = (chapterId: string) => {
    if (!activeProject) return;
    const currentCh = activeProject.chapters.find(c => c.id === chapterId);
    if (!currentCh) return;

    if (window.confirm(`Voulez-vous supprimer définitivement le Chapitre ${currentCh.number} : "${currentCh.title}" ?`)) {
      const updated = projects.map(p => {
        if (p.id === selectedProjectId) {
          return {
            ...p,
            chapters: p.chapters.filter(c => c.id !== chapterId)
          };
        }
        return p;
      });
      saveToStorage(updated);

      // Auto select first chapter if any are left
      const targetProj = updated.find(p => p.id === selectedProjectId);
      if (targetProj && targetProj.chapters.length > 0) {
        setSelectedChapterId(targetProj.chapters[0].id);
      } else {
        setSelectedChapterId(null);
      }
    }
  };

  // Glossary mechanics
  const handleAddGlossaryEntry = (entry: Omit<GlossaryEntry, "id">) => {
    if (!activeProject) return;
    const newEntry: GlossaryEntry = {
      ...entry,
      id: "g-" + Date.now(),
    };
    const updated = projects.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, glossary: [...p.glossary, newEntry] };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleDeleteGlossaryEntry = (id: string) => {
    if (!activeProject) return;
    const updated = projects.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, glossary: p.glossary.filter(g => g.id !== id) };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleImportBulkGlossary = (rawText: string) => {
    if (!activeProject) return;
    const lines = rawText.split("\n");
    const newEntries: GlossaryEntry[] = [];
    let count = 0;

    for (const line of lines) {
      if (!line.trim()) continue;
      const parts = line.split(";");
      if (parts.length >= 2) {
        newEntries.push({
          id: "g-" + Math.random().toString(36).substr(2, 9),
          original: parts[0].trim(),
          translation: parts[1].trim(),
          notes: parts[2] ? parts[2].trim() : undefined
        });
        count++;
      }
    }

    if (count > 0) {
      const updated = projects.map(p => {
        if (p.id === selectedProjectId) {
          return { ...p, glossary: [...p.glossary, ...newEntries] };
        }
        return p;
      });
      saveToStorage(updated);
    } else {
      alert("Format d'import invalide. Utilisez: TermeOriginal;Traduction;Note(facultative)");
    }
  };

  // Chapter mechanics
  const handleAddChapter = (number: number, title: string, text: string) => {
    if (!activeProject) return;
    const newCh: Chapter = {
      id: "ch-" + Date.now(),
      number,
      title,
      originalText: text,
      sourceLang: activeProject.sourceLang,
      targetLang: "FR",
      status: "pending",
      createdAt: new Date().toISOString()
    };
    const updated = projects.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, chapters: [...p.chapters, newCh] };
      }
      return p;
    });
    saveToStorage(updated);
    setSelectedChapterId(newCh.id);
  };

  const handleUpdateChapterTranslatedText = (id: string, text: string) => {
    if (!activeProject) return;
    const updated = projects.map(p => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          chapters: p.chapters.map(c => c.id === id ? { ...c, translatedText: text, status: "done" as const } : c)
        };
      }
      return p;
    });
    saveToStorage(updated);
  };

  // Translation Core 3-stages pipeline
  const handleTranslateChapter = async (chapterId: string) => {
    if (!activeProject) return;
    const chapter = activeProject.chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    setIsTranslating(true);
    
    // Set Chapter status to "translating"
    setProjects(prevProjects => {
      return prevProjects.map(p => {
        if (p.id === selectedProjectId) {
          return {
            ...p,
            chapters: p.chapters.map(c => c.id === chapterId ? { ...c, status: "translating" as const } : c)
          };
        }
        return p;
      });
    });

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalText: chapter.originalText,
          sourceLang: activeProject.sourceLang,
          glossary: activeProject.glossary,
          projectId: selectedProjectId,
          chapterTitle: chapter.title,
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Erreur lors de la traduction.");
      }

      // Merge results and sync glossary on the fly
      setProjects(prevProjects => {
        const finalProjects = prevProjects.map(p => {
          if (p.id === selectedProjectId) {
            const mergedGlossary = [...p.glossary];
            if (data.newGlossaryEntries && Array.isArray(data.newGlossaryEntries)) {
              data.newGlossaryEntries.forEach((newG: any) => {
                if (!mergedGlossary.some(g => g.original.toLowerCase() === newG.original.toLowerCase())) {
                  mergedGlossary.push(newG);
                }
              });
            }

            return {
              ...p,
              glossary: mergedGlossary,
              chapters: p.chapters.map(c => c.id === chapterId ? {
                ...c,
                status: "done" as const,
                title: data.translatedTitle || c.title,
                draftText: data.draftText,
                validationNotes: data.validationNotes,
                translatedText: data.translatedText,
                translatedAt: new Date().toISOString()
              } : c)
            };
          }
          return p;
        });

        localStorage.setItem("novel_translator_projects", JSON.stringify(finalProjects));
        fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalProjects)
        }).catch(err => console.error("Disk save failure:", err));

        return finalProjects;
      });

    } catch (err: any) {
      console.error(err);
      setProjects(prevProjects => {
        const finalProjects = prevProjects.map(p => {
          if (p.id === selectedProjectId) {
            return {
              ...p,
              chapters: p.chapters.map(c => c.id === chapterId ? {
                ...c,
                status: "failed" as const,
                error: err.message || "Erreur de connexion."
              } : c)
            };
          }
          return p;
        });
        
        localStorage.setItem("novel_translator_projects", JSON.stringify(finalProjects));
        fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalProjects)
        }).catch(e => console.error("Disk save failure post-error:", e));

        return finalProjects;
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCreateProject = (name: string, sourceLang: "CN" | "EN" | "KR") => {
    const newProj: WebnovelProject = {
      id: "project-" + Date.now(),
      name,
      sourceLang,
      targetLang: "FR",
      glossary: [],
      chapters: [],
      createdAt: new Date().toISOString()
    };
    const updated = [...projects, newProj];
    saveToStorage(updated);
    setSelectedProjectId(newProj.id);
    setSelectedChapterId(null);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode 
        ? "dark bg-[#171412] text-stone-200 selection:bg-amber-800/40" 
        : "bg-[#fcfaf7] text-stone-900 selection:bg-amber-100"
    }`}>
      
      {/* RICH BROWN HARVEST LITERARY HEADER */}
      <header className="border-b border-amber-900/10 dark:border-stone-800 bg-white/95 dark:bg-[#201915]/95 backdrop-blur-md sticky top-0 z-40 px-6 py-4 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-amber-700 dark:bg-amber-800 text-white rounded-2xl shadow-md">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-extrabold text-base tracking-tight text-amber-950 dark:text-stone-100">
                  Scriptorium — Traducteur & Lecteur de Webnovel
                </h1>
                <span className="bg-amber-700/10 text-amber-800 dark:text-amber-400 border border-amber-600/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-sans">
                  Pipeline Littéraire en 3 Étapes
                </span>
              </div>
              <p className="text-xs text-stone-550 dark:text-stone-400 font-sans">
                Alignement terminologique strict avec détection et enrichissement de Lore par IA.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto flex-wrap">
            
            {/* Dark mode button */}
            <button
              onClick={handleToggleDarkMode}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#1d1916] hover:bg-stone-100 dark:hover:bg-[#251e1a] text-stone-605 dark:text-stone-300 transition-all cursor-pointer shadow-sm flex items-center justify-center"
              title={isDarkMode ? "Passer en mode clair" : "Passer en mode nuit sombre"}
              id="btn-toggle-dark-mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            {/* Secure API Key indicator */}
            <div className="bg-stone-50/50 dark:bg-[#1d1916] border border-stone-200/80 dark:border-stone-800 rounded-xl p-2 px-3.5 flex items-center gap-2.5 shadow-sm text-xs select-none">
              <div className={`w-2.5 h-2.5 rounded-full ${healthStatus.active ? "bg-emerald-500 animate-pulse" : "bg-amber-700"}`} />
              <div className="flex flex-col text-[11px] leading-tight">
                <span className="text-stone-400 font-sans font-bold uppercase tracking-wider text-[8px]">SYNTHÈSE IA</span>
                <span className="font-bold text-stone-700 dark:text-stone-305 font-sans">
                  {healthStatus.active ? "Gemini Direct" : "Discutez à droite pour traduire"}
                </span>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* DUAL MODE SECTION TAB BAR (TRADUCTION vs LECTURE) */}
      <div className="border-b border-amber-900/5 dark:border-stone-850 bg-amber-500/5 dark:bg-[#1d1916]/50 py-3 px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          
          <button
            onClick={() => setActiveTab("traduction")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "traduction"
                ? "bg-amber-800 text-white shadow-sm scale-[1.02]"
                : "text-stone-500 hover:text-amber-800 dark:text-stone-400 dark:hover:text-amber-400 bg-transparent hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            id="tab-traduction"
          >
            <Hammer className="w-4 h-4" />
            <span>Onglet : Traduction & Lore</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("lecture");
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "lecture"
                ? "bg-amber-800 text-white shadow-sm scale-[1.02]"
                : "text-stone-500 hover:text-amber-800 dark:text-stone-400 dark:hover:text-amber-400 bg-transparent hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            id="tab-lecture"
          >
            <BookOpen className="w-4 h-4" />
            <span>Onglet : Lecture Distraction-Free</span>
          </button>

        </div>
      </div>

      {/* CORE FRAMEWORK CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 min-h-0">
        
        {activeTab === "traduction" ? (
          /* TRADUCTION SECTION: FULL POWER WORKBENCH */
          <div className="space-y-6 animate-fadeIn">
            
            {/* ROW 1: Library Selector & novel imports */}
            <ProjectManager
              projects={projects}
              selectedProjectId={selectedProjectId}
              onSelectProject={(id) => {
                setSelectedProjectId(id);
                const proj = projects.find(p => p.id === id);
                if (proj && proj.chapters.length > 0) {
                  setSelectedChapterId(proj.chapters[0].id);
                } else {
                  setSelectedChapterId(null);
                }
              }}
              onCreateProject={handleCreateProject}
              onDeleteProject={handleDeleteProject}
            />

            {/* ROW 2: SPLIT PANEL EXECUTIONS */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch min-h-0">
              
              {/* Left-center chapter list & live synchronizer */}
              <div className="xl:col-span-8 flex flex-col min-h-0">
                <ChapterWorkspace
                  chapters={activeProject?.chapters || []}
                  selectedChapterId={selectedChapterId}
                  onSelectChapter={setSelectedChapterId}
                  onAddChapter={handleAddChapter}
                  onTranslateChapter={handleTranslateChapter}
                  onUpdateTranslatedText={handleUpdateChapterTranslatedText}
                  onDeleteChapter={handleDeleteChapter}
                  isTranslating={isTranslating}
                  hasApiKey={healthStatus.active}
                  readChapterIds={readChapterIds}
                />
              </div>

              {/* Right Glossary coherence panel */}
              <div className="xl:col-span-4 flex flex-col min-h-0 h-full">
                <GlossaryPanel
                  glossary={activeProject?.glossary || []}
                  onAddEntry={handleAddGlossaryEntry}
                  onDeleteEntry={handleDeleteGlossaryEntry}
                  onImportBulk={handleImportBulkGlossary}
                  sourceLang={activeProject?.sourceLang || "CN"}
                />
              </div>

            </div>

          </div>
        ) : (
          /* LECTURE SECTION: Dedicated physical book simulation */
          <div className="animate-fadeIn">
            <BookReader
              projects={projects}
              selectedProjectId={selectedProjectId}
              onSelectProject={(id) => {
                setSelectedProjectId(id);
                const proj = projects.find(p => p.id === id);
                if (proj && proj.chapters.length > 0) {
                  setSelectedChapterId(proj.chapters[0].id);
                } else {
                  setSelectedChapterId(null);
                }
              }}
              activeChapterId={selectedChapterId}
              setActiveChapterId={setSelectedChapterId}
              isDarkMode={isDarkMode}
              onToggleDarkMode={handleToggleDarkMode}
              readChapterIds={readChapterIds}
              onToggleRead={handleToggleRead}
            />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-amber-900/10 dark:border-stone-850 bg-white/40 dark:bg-[#1d1916]/20 py-6 px-6 text-center text-[11px] text-stone-450 dark:text-stone-500 leading-normal font-sans">
        <div>
          Scriptorium Littéraire d’Antigravity IDE — Consistance terminologique assistée par IA.<br />
          Zéro distractions de diagnostic, focus absolu sur la fluidité et le plaisir de lecture.
        </div>
      </footer>

    </div>
  );
}
