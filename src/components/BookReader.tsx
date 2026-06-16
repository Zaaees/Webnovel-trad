import React, { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Type, Palette, Compass, RefreshCw, Sparkles, Check } from "lucide-react";
import { WebnovelProject, Chapter } from "../types";

interface BookReaderProps {
  projects: WebnovelProject[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  activeChapterId: string | null;
  setActiveChapterId: (id: string | null) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  readChapterIds: string[];
  onToggleRead: (id: string) => void;
}

export default function BookReader({
  projects,
  selectedProjectId,
  onSelectProject,
  activeChapterId,
  setActiveChapterId,
  isDarkMode,
  onToggleDarkMode,
  readChapterIds,
  onToggleRead,
}: BookReaderProps) {
  const [fontSize, setFontSize] = useState<number>(18);
  const [readerTheme, setReaderTheme] = useState<"parchment" | "sepia" | "paper" | "darkwood">(
    isDarkMode ? "darkwood" : "parchment"
  );

  // Auto-mark as read timer when viewing a chapter
  useEffect(() => {
    if (activeChapterId) {
      const timer = setTimeout(() => {
        if (!readChapterIds.includes(activeChapterId)) {
          onToggleRead(activeChapterId);
        }
      }, 1500); // 1.5 seconds of viewing marks it as read
      return () => clearTimeout(timer);
    }
  }, [activeChapterId, readChapterIds, onToggleRead]);

  // Sync reader theme with dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      setReaderTheme("darkwood");
    } else {
      if (readerTheme === "darkwood") {
        setReaderTheme("parchment");
      }
    }
  }, [isDarkMode]);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Only translated chapters
  const availableChapters = activeProject?.chapters.filter((c) => c.status === "done") || [];

  // Sort chapters by number
  const sortedChapters = [...availableChapters].sort((a, b) => a.number - b.number);

  // Set default chapter if none selected or if selected chapter doesn't exist in project
  useEffect(() => {
    if (sortedChapters.length > 0) {
      if (!activeChapterId || !sortedChapters.some((c) => c.id === activeChapterId)) {
        setActiveChapterId(sortedChapters[0].id);
      }
    } else {
      setActiveChapterId(null);
    }
  }, [selectedProjectId, availableChapters.length]);

  const activeChapter = sortedChapters.find((c) => c.id === activeChapterId);

  // Pagination index calculation
  const currentIndex = sortedChapters.findIndex((c) => c.id === activeChapterId);
  const prevChapter = currentIndex > 0 ? sortedChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : null;

  const getThemeClass = () => {
    switch (readerTheme) {
      case "sepia":
        return "reader-sepia border-amber-900/10";
      case "paper":
        return "reader-paper border-slate-200";
      case "darkwood":
        return "reader-darkwood border-stone-800";
      case "parchment":
      default:
        return "reader-parchment border-amber-800/10";
    }
  };

  return (
    <div id="book-reader-container" className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
      
      {/* LEFT COLUMN: NOVEL & CHAPTER PICKER */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        
        {/* Project Selection in Book Mode */}
        <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-[#251e1a] border-stone-850 text-stone-200" : "bg-white border-amber-100 shadow-sm text-stone-900"} flex flex-col gap-3 transition-colors`}>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-sans">
              Sélectionner le Roman
            </h3>
          </div>
          
          <select
            value={selectedProjectId}
            onChange={(e) => {
              onSelectProject(e.target.value);
              setActiveChapterId(null);
            }}
            className={`w-full border rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer transition ${
              isDarkMode 
                ? "bg-[#1d1916] border-stone-800 text-stone-200 focus:border-amber-600" 
                : "bg-stone-50 border-amber-100 text-stone-800 focus:border-amber-700"
            }`}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {activeProject && (
            <div className={`text-[11px] leading-relaxed p-2.5 rounded-lg border ${isDarkMode ? "bg-[#1d1916]/50 border-stone-800 text-stone-400" : "bg-amber-50/50 border-amber-100/50 text-amber-900"}`}>
              <div className="font-bold font-sans">Résumé :</div>
              <p className="line-clamp-3 italic mt-0.5">{activeProject.description || "Pas de description"}</p>
            </div>
          )}
        </div>

        {/* Chapters list (translated only) */}
        <div className={`p-5 rounded-2xl border flex-1 flex flex-col gap-3 min-h-[350px] lg:min-h-[450px] transition-colors ${
          isDarkMode ? "bg-[#251e1a] border-stone-810 text-stone-200" : "bg-white border-amber-100 shadow-sm text-stone-900"
        }`}>
          <div className="flex items-center justify-between border-b pb-2.5 border-amber-100/40 dark:border-stone-800">
            <div className="flex flex-col">
              <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider">
                CHAPITRES DE LECTURE
              </span>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-550">
                {sortedChapters.length} Traduit(s)
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[350px] lg:max-h-[500px]">
            {sortedChapters.length === 0 ? (
              <div className="text-center py-10 flex flex-col items-center gap-2 text-stone-400 dark:text-stone-500">
                <Compass className="w-8 h-8 opacity-40 animate-pulse" />
                <p className="text-xs">Aucun chapitre traduit.</p>
                <p className="text-[10px] px-4 max-w-xs leading-relaxed opacity-80">
                  Rendez-vous dans la section **Traduction** pour traduire un chapitre avec votre glossaire d'IA !
                </p>
              </div>
            ) : (
              sortedChapters.map((ch) => {
                const isActive = ch.id === activeChapterId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterId(ch.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-sans transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isActive
                        ? "bg-amber-100/40 dark:bg-amber-900/20 border-amber-400 text-amber-900 dark:text-amber-400 font-bold shadow-sm"
                        : "bg-transparent border-transparent text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-[#1d1916] hover:text-stone-805"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[10px] opacity-70 tracking-wide font-medium">
                        <span>CHAPITRE {ch.number}</span>
                        {readChapterIds.includes(ch.id) && (
                          <span className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/20 text-[8px] font-sans font-extrabold px-1 py-0.2 rounded leading-none shadow-sm">
                            Lu
                          </span>
                        )}
                      </div>
                      <div className="truncate font-serif text-[13px] mt-0.5">
                        {ch.title}
                      </div>
                    </div>
                    {isActive && (
                      <Check className="w-3.5 h-3.5 text-amber-700 dark:text-amber-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: CORE IMMERSIVE BOOK SHEET */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        
        {/* Book Sheet Container */}
        {activeChapter ? (
          <div className={`rounded-3xl border shadow-md flex flex-col overflow-hidden min-h-[550px] transition-all bg-stone-50 ${getThemeClass()}`}>
            
            {/* HUD / Settings bar inside Book container */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-6 py-4 border-b border-black/5 dark:border-white/5 bg-black/2">
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5 opacity-60 font-sans text-[10px] font-bold tracking-widest uppercase">
                  <span>Chapitre {activeChapter.number}</span>
                  <span>•</span>
                  <span className="truncate max-w-[120px]">{activeProject.name}</span>
                </div>
                <h2 className="font-bold text-sm md:text-base truncate max-w-sm font-serif tracking-tight">
                  {activeChapter.title}
                </h2>
              </div>

              {/* Adjusters HUD */}
              <div className="flex flex-wrap items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                
                {/* Lu / Non Lu Toggle Button */}
                <button
                  type="button"
                  onClick={() => onToggleRead(activeChapter.id)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-sans font-bold tracking-tight transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    readChapterIds.includes(activeChapter.id)
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-400 font-extrabold"
                      : "bg-stone-100/50 dark:bg-stone-800 border-stone-250 dark:border-stone-705 text-stone-600 dark:text-stone-300"
                  }`}
                  title={readChapterIds.includes(activeChapter.id) ? "Marquer ce chapitre comme non lu" : "Marquer ce chapitre comme lu"}
                  id="btn-manual-toggle-read"
                >
                  <Check className={`w-3.5 h-3.5 ${readChapterIds.includes(activeChapter.id) ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-stone-400"}`} />
                  <span>{readChapterIds.includes(activeChapter.id) ? "Chapitre Lu" : "Marquer comme Lu"}</span>
                </button>

                {/* Copier le lien bookmarkable */}
                <button
                  type="button"
                  onClick={() => {
                    const hashObj = new URLSearchParams();
                    hashObj.set("tab", "lecture");
                    hashObj.set("project", selectedProjectId);
                    hashObj.set("chapter", activeChapter.id);
                    const directUrl = `${window.location.origin}${window.location.pathname}#${hashObj.toString()}`;
                    navigator.clipboard.writeText(directUrl);
                    alert("Lien direct copié ! Vous pouvez l'enregistrer dans vos favoris de navigateur.");
                  }}
                  className="px-3 py-1.5 rounded-xl border border-stone-250 dark:border-stone-705 bg-stone-100/50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] font-sans font-bold hover:bg-stone-150 dark:hover:bg-stone-700 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                  title="Copier le lien direct vers cette page spécifique pour l'enregistrer dans vos favoris"
                  id="btn-copy-bookmark-link"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-500" />
                  <span>Lien Favori</span>
                </button>

                {/* FontSize controls */}
                <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 rounded-xl p-1 border border-black/10 dark:border-white/10 font-sans">
                  <button
                    type="button"
                    onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                    className="p-1 px-2.5 text-[11px] font-bold rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer transition active:scale-90"
                    title="Diminuer la taille"
                    id="btn-font-dec"
                  >
                    A-
                  </button>
                  <span className="text-[11px] font-mono font-bold px-1 tracking-tighter">
                    {fontSize}px
                  </span>
                  <button
                    type="button"
                    onClick={() => setFontSize(Math.min(28, fontSize + 1))}
                    className="p-1 px-2.5 text-[11px] font-bold rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer transition active:scale-90"
                    title="Augmenter la taille"
                    id="btn-font-inc"
                  >
                    A+
                  </button>
                </div>

                {/* Theme presets */}
                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl p-1 border border-black/10 dark:border-white/10">
                  <button
                    onClick={() => { setReaderTheme("parchment"); }}
                    className={`w-5 h-5 rounded-full border border-stone-300 dark:border-stone-850 bg-[#fcf8f2] shadow-sm relative ${readerTheme === "parchment" ? "ring-2 ring-amber-600 scale-105" : "hover:scale-105"} cursor-pointer transition-transform`}
                    title="Parchemin doux"
                    id="btn-theme-parchment"
                  />
                  <button
                    onClick={() => { setReaderTheme("sepia"); }}
                    className={`w-5 h-5 rounded-full border border-stone-300 dark:border-stone-850 bg-[#f4edd8] shadow-sm relative ${readerTheme === "sepia" ? "ring-2 ring-amber-700 scale-105" : "hover:scale-105"} cursor-pointer transition-transform`}
                    title="Sépia historique"
                    id="btn-theme-sepia"
                  />
                  <button
                    onClick={() => { setReaderTheme("paper"); }}
                    className={`w-5 h-5 rounded-full border border-stone-300 dark:border-stone-850 bg-white shadow-sm relative ${readerTheme === "paper" ? "ring-2 ring-stone-400 scale-105" : "hover:scale-105"} cursor-pointer transition-transform`}
                    title="Papier blanc pur"
                    id="btn-theme-white-paper"
                  />
                  <button
                    onClick={() => { setReaderTheme("darkwood"); onToggleDarkMode(); }}
                    className={`w-5 h-5 rounded-full border border-stone-900 bg-[#1d1916] shadow-sm relative ${readerTheme === "darkwood" ? "ring-2 ring-amber-500 scale-105" : "hover:scale-105"} cursor-pointer transition-transform`}
                    title="Nuit sombre"
                    id="btn-theme-darkwood"
                  />
                </div>

              </div>
            </div>

            {/* Book Body Column wrapper */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 pt-10 pb-16 flex flex-col min-h-0">
              <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between">
                
                {/* Elegant Title Header inside the page */}
                <div className="text-center pb-8 border-b border-black/5 dark:border-white/5 mb-8">
                  <div className="text-[11px] font-sans font-bold tracking-widest text-amber-800 dark:text-amber-550 uppercase">
                    CHAPITRE {activeChapter.number}
                  </div>
                  <h1 className="font-serif font-bold text-xl sm:text-2xl mt-1 tracking-tight">
                    {activeChapter.title}
                  </h1>
                </div>

                {/* Plain Narrative text (Lora serif, exquisite spacing) */}
                <div
                  style={{ fontSize: `${fontSize}px`, lineHeight: "1.9" }}
                  className="whitespace-pre-line text-justify select-text focus:outline-none flex-1 font-serif selection:bg-amber-700/20"
                >
                  {activeChapter.translatedText}
                </div>

                {/* Bottom Paginated Navigation UI */}
                <div className="flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-10 mt-12 font-sans font-medium text-xs">
                  {prevChapter ? (
                    <button
                      type="button"
                      onClick={() => setActiveChapterId(prevChapter.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition cursor-pointer active:scale-95 text-[#4a3525] dark:text-[#ded1be]"
                      id="btn-prev-page-bottom"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Ch. {prevChapter.number}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <span className="opacity-40 italic">
                    Ch {activeChapter.number} de {sortedChapters.length}
                  </span>

                  {nextChapter ? (
                    <button
                      type="button"
                      onClick={() => setActiveChapterId(nextChapter.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-amber-700 text-white hover:bg-amber-600 rounded-xl transition cursor-pointer active:scale-95 font-bold shadow-sm"
                      id="btn-next-page-bottom"
                    >
                      <span>Ch. {nextChapter.number}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div />
                  )}
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* Empty reading view placeholder */
          <div className={`rounded-3xl border border-dashed text-center flex flex-col items-center justify-center gap-4 py-24 px-6 min-h-[500px] ${
            isDarkMode ? "bg-[#251e1a]/40 border-stone-800 text-stone-500" : "bg-stone-50/50 border-amber-200 text-amber-900/60"
          }`}>
            <BookOpen className="w-14 h-14 opacity-20 text-amber-750 shrink-0" />
            <h3 className="font-bold font-serif text-base text-stone-800 dark:text-stone-300">
              Aucun Chapitre Prêt pour la Lecture
            </h3>
            <p className="text-xs max-w-sm leading-relaxed text-stone-500 font-sans">
              Pour lire une œuvre, vous devez d'abord charger ses chapitres et les traduire en français depuis le module **Traduction** enrichi par IA.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
