import React, { useState, useEffect } from "react";
import { 
  Sparkles, BookOpen, Layers, RefreshCw, 
  Check, AlertCircle, Bookmark, Compass
} from "lucide-react";
import { WebnovelProject, GlossaryEntry, Chapter } from "./types";
import ProjectManager from "./components/ProjectManager";
import GlossaryPanel from "./components/GlossaryPanel";
import ChapterWorkspace from "./components/ChapterWorkspace";

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
        status: "pending",
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
      { id: "cd2", original: "Ring of the Dragon", translation: "Anneau du Dragon", notes: "Artefact mythique de rang divin scellé dans l'argile." },
      { id: "cd3", original: "earth-style magic", translation: "magie tellurique", notes: "Sortilèges et affinités magiques liés à la terre profonde." },
      { id: "cd4", original: "beast", translation: "Créature Magique Sauvage", notes: "Créatures mystiques rôdant dans la chaîne de montagnes." },
      { id: "cd5", original: "martial artist", translation: "Guerrier Champion martial", notes: "Classe de combat d'élite utilisant la force physique pure." }
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

export default function App() {
  const [projects, setProjects] = useState<WebnovelProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [healthStatus, setHealthStatus] = useState<{ checked: boolean; active: boolean }>({ checked: false, active: false });

  // Load from server disk on mount
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
        console.warn("Failed fetching projects from API, trying static copy:", e);
        fetch("./data/projects.json")
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
              throw new Error("Empty data");
            }
          })
          .catch((err) => {
            console.error("Failed fetching static projects.json:", err);
            setProjects(SEED_PROJECTS);
            setSelectedProjectId(SEED_PROJECTS[0].id);
            if (SEED_PROJECTS[0].chapters.length > 0) {
              setSelectedChapterId(SEED_PROJECTS[0].chapters[0].id);
            }
          });
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

      // Merge results and merge any auto-generated glossary rules on the fly using functional state!
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
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500/20">
      
      {/* BEAUTIFUL ELEMEENTARY LITERARY HEADER */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-extrabold text-base text-slate-900 tracking-tight">
                  Lecteur & Traducteur Littéraire IA
                </h1>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                  Polissage Anti-Hallucination
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Lisez vos romans en plein écran, appliquez un glossaire et enrichissez automatiquement le lore.
              </p>
            </div>
          </div>

          {/* Secure API Key indicator */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 px-3 flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${healthStatus.active ? "bg-emerald-500" : "bg-indigo-600 animate-pulse"}`} />
              <div className="flex flex-col text-[11px] leading-tight">
                <span className="text-slate-400 font-sans font-semibold uppercase tracking-wider text-[9px]">MOTEUR DE SYNTHÈSE</span>
                <span className="font-bold text-slate-700 font-sans">
                  {healthStatus.active ? "Gemini Connecté" : "Discutez à droite pour traduire"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* CORE FRAMEWORK CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ROW 1: Project Manager selection */}
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

        {/* ROW 2: SPLIT COHESION AND CONTENT */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          
          {/* Chapter view & Side by side translations */}
          <div className="xl:col-span-8">
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
            />
          </div>

          {/* Glossary panel list */}
          <div className="xl:col-span-4 h-full">
            <GlossaryPanel
              glossary={activeProject?.glossary || []}
              onAddEntry={handleAddGlossaryEntry}
              onDeleteEntry={handleDeleteGlossaryEntry}
              onImportBulk={handleImportBulkGlossary}
              sourceLang={activeProject?.sourceLang || "CN"}
            />
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-center text-[11px] text-slate-400 leading-normal">
        <div>
          Lecteur & Traducteur de Webnovel d’Antigravity IDE — Consistance terminologique assistée par IA.<br />
          Zéro distractions de terminal, focus absolu sur la fluidité et le plaisir de lecture littéraire.
        </div>
      </footer>

    </div>
  );
}
