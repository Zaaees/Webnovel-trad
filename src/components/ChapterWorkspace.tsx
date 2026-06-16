import React, { useState } from "react";
import { 
  FileText, Plus, Sparkles, Send, AlertTriangle, 
  FileDown, Edit3, Save, Copy, Check, Trash2, 
  Maximize2, ZoomIn, ZoomOut, Type
} from "lucide-react";
import { Chapter } from "../types";

interface ChapterWorkspaceProps {
  chapters: Chapter[];
  selectedChapterId: string | null;
  onSelectChapter: (id: string) => void;
  onAddChapter: (number: number, title: string, text: string) => void;
  onTranslateChapter: (id: string) => void;
  onUpdateTranslatedText: (id: string, text: string) => void;
  onDeleteChapter: (id: string) => void;
  isTranslating: boolean;
  hasApiKey?: boolean;
  readChapterIds?: string[];
}

export default function ChapterWorkspace({
  chapters,
  selectedChapterId,
  onSelectChapter,
  onAddChapter,
  onTranslateChapter,
  onUpdateTranslatedText,
  onDeleteChapter,
  isTranslating,
  hasApiKey = false,
  readChapterIds = [],
}: ChapterWorkspaceProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newNum, setNewNum] = useState<number>(chapters.length + 1);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  
  // Workspace views: "final" | "edit"
  const [activeTab, setActiveTab] = useState<"final" | "edit">("final");
  const [editedText, setEditedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isCommandCopied, setIsCommandCopied] = useState(false);

  // Batch translation states
  const [selectedBatchIds, setSelectedBatchIds] = useState<string[]>([]);
  const [isBatchTranslating, setIsBatchTranslating] = useState(false);
  const [batchTranslationProgress, setBatchTranslationProgress] = useState<string>("");
  const [isBatchCommandCopied, setIsBatchCommandCopied] = useState(false);

  // Visibility filters
  const [hideTranslated, setHideTranslated] = useState(false);

  const handleSelectAll = () => {
    setSelectedBatchIds(chapters.map(c => c.id));
  };
  
  const handleSelectNone = () => {
    setSelectedBatchIds([]);
  };

  const handleSelectPending = () => {
    setSelectedBatchIds(chapters.filter(c => c.status !== "done").map(c => c.id));
  };

  const handleSelectNextTenPending = () => {
    const untranslated = chapters.filter(c => c.status !== "done");
    const nextTen = untranslated.slice(0, 10).map(c => c.id);
    setSelectedBatchIds(nextTen);
  };

  const handleToggleBatchId = (id: string) => {
    setSelectedBatchIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const startBatchTranslation = async () => {
    if (selectedBatchIds.length === 0) return;
    setIsBatchTranslating(true);
    const total = selectedBatchIds.length;
    
    try {
      for (let i = 0; i < total; i++) {
        const id = selectedBatchIds[i];
        const ch = chapters.find(c => c.id === id);
        if (ch) {
          setBatchTranslationProgress(`Traduction ${i + 1}/${total} (Ch. ${ch.number}) ...`);
          onSelectChapter(id);
          await onTranslateChapter(id);
        }
      }
    } catch (err) {
      console.error("Batch translation error:", err);
    } finally {
      setIsBatchTranslating(false);
      setBatchTranslationProgress("");
      setSelectedBatchIds([]);
    }
  };

  const selectedChapter = chapters.find(c => c.id === selectedChapterId);

  const filteredChapters = hideTranslated 
    ? chapters.filter(c => c.status !== "done")
    : chapters;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;
    onAddChapter(newNum, newTitle.trim(), newText.trim());
    setNewTitle("");
    setNewText("");
    setNewNum(chapters.length + 2);
    setIsAdding(false);
  };

  const handleCopy = () => {
    if (!selectedChapter?.translatedText) return;
    navigator.clipboard.writeText(selectedChapter.translatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!selectedChapter) return;
    const textToDownload = 
      `Ch. ${selectedChapter.number} - ${selectedChapter.title}\n\n` + 
      (selectedChapter.translatedText || "Non traduit encore");
    
    const element = document.createElement("a");
    const file = new Blob([textToDownload], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `Chapitre_${selectedChapter.number}_Traduit.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const startEditing = () => {
    if (selectedChapter) {
      setEditedText(selectedChapter.translatedText || "");
      setActiveTab("edit");
    }
  };

  const saveEditing = () => {
    if (selectedChapter) {
      onUpdateTranslatedText(selectedChapter.id, editedText);
      setActiveTab("final");
    }
  };

  return (
    <div id="chapter-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[550px]">
      
      {/* LEFT COLUMN: CHAPTERS LIST */}
      <div className="lg:col-span-4 bg-stone-50/50 dark:bg-[#251e1a]/80 border border-amber-100 dark:border-stone-800 rounded-2xl p-5 flex flex-col gap-4 h-full max-h-[720px] overflow-hidden shadow-sm transition-colors">
        
        <div className="flex items-center justify-between border-b border-amber-100/60 dark:border-stone-805/80 pb-3 flex-shrink-0">
          <h3 className="font-sans font-bold text-amber-900 dark:text-stone-200 text-sm tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-700" />
            <span>CHAPITRES</span>
          </h3>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="p-1.5 px-3 bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-900/10 dark:hover:bg-amber-900/20 border border-amber-150 dark:border-stone-700 rounded-xl text-xs text-amber-800 dark:text-amber-400 font-bold flex items-center gap-1 transition"
            id="btn-add-chapter"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter</span>
          </button>
        </div>

        {/* Batch selection helper bar */}
        {chapters.length > 0 && (
          <div className="bg-stone-100/50 dark:bg-[#1d1916] p-3 rounded-xl border border-stone-250/20 flex flex-col gap-2 text-[11px] text-stone-550 dark:text-stone-400">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 dark:text-stone-300">{selectedBatchIds.length} sélectionné(s)</span>
                <button type="button" onClick={handleSelectNone} className="font-bold text-rose-700 hover:text-rose-600 transition">Vider la sélection</button>
              </div>
              
              {/* Responsive wrap buttons for batch selection */}
              <div className="flex items-center gap-1.5 flex-wrap font-semibold pt-1 border-t border-amber-900/5 dark:border-stone-800">
                <button type="button" onClick={handleSelectAll} className="px-2 py-0.5 bg-stone-200/50 hover:bg-stone-200 dark:bg-stone-805 dark:hover:bg-stone-800 rounded text-[10px] text-stone-705 dark:text-stone-300 transition">Tous</button>
                <button type="button" onClick={handleSelectPending} className="px-2 py-0.5 bg-stone-200/50 hover:bg-stone-200 dark:bg-stone-805 dark:hover:bg-stone-800 rounded text-[10px] text-stone-705 dark:text-stone-300 transition">Tous non-traduits</button>
                <button type="button" onClick={handleSelectNextTenPending} className="px-2 py-0.5 bg-amber-700 hover:bg-amber-600 rounded text-[10px] text-white transition" title="Sélectionner les 10 prochains chapitres non traduits">+10 non-traduits</button>
              </div>
            </div>
          </div>
        )}

        {/* Visibility filters */}
        {chapters.length > 0 && (
          <div className="flex items-center justify-between bg-stone-100/30 dark:bg-[#1d1916]/40 px-3 py-2 rounded-xl border border-amber-900/5 dark:border-stone-800">
            <label className="flex items-center gap-2.5 text-[11px] font-bold text-stone-605 dark:text-stone-300 cursor-pointer select-none w-full">
              <input
                type="checkbox"
                checked={hideTranslated}
                onChange={(e) => setHideTranslated(e.target.checked)}
                className="w-5 h-5 accent-amber-700 border-stone-300 dark:border-stone-700 rounded cursor-pointer transition focus:ring-amber-500"
                id="checkbox-hide-translated"
              />
              <span>Masquer les traduits</span>
            </label>
          </div>
        )}

        {/* Chapters Scrollable Area */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[480px]">
          {filteredChapters.length === 0 ? (
            <div className="text-center text-xs text-stone-400 dark:text-stone-500 py-10">
              {chapters.length === 0 ? "Aucun chapitre importé." : "Aucun chapitre correspond à ce filtre."}
            </div>
          ) : (
            filteredChapters.map((ch) => {
              const works = ch.id === selectedChapterId;
              const isChecked = selectedBatchIds.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  className={`group relative flex items-center gap-3 rounded-xl border transition-all duration-150 pl-3 ${
                    works
                      ? "bg-amber-500/10 dark:bg-amber-900/10 border-amber-300 dark:border-amber-900/40 text-amber-950 dark:text-amber-400 shadow-sm"
                      : "bg-white dark:bg-[#1d1916] border-stone-200/60 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#221c1a] hover:text-stone-800"
                  }`}
                  id={`chapter-row-${ch.id}`}
                >
                  {/* LARGER SELECTION CHECKBOX (EASY CLICK) */}
                  <div className="py-2 flex-shrink-0 flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleBatchId(ch.id)}
                      className="w-5 h-5 accent-amber-700 border-stone-300 dark:border-stone-700 rounded cursor-pointer transition focus:ring-amber-500"
                      id={`checkbox-chapter-${ch.id}`}
                    />
                  </div>

                  <button
                    onClick={() => {
                      onSelectChapter(ch.id);
                      setIsAdding(false);
                      if (activeTab === "edit") {
                        setActiveTab("final");
                      }
                    }}
                    className="flex-1 text-left py-3.5 pr-10 min-w-0 cursor-pointer"
                  >
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 group-hover:text-amber-700 transition-colors">
                          Chapitre {ch.number}
                        </span>
                        {readChapterIds.includes(ch.id) && (
                          <span className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-500/20 text-[8px] font-sans font-extrabold px-1 py-0.2 rounded leading-none shadow-sm">
                            Lu
                          </span>
                        )}
                      </div>
                      <span className="font-serif font-semibold text-[13px] truncate leading-snug">
                        {ch.title}
                      </span>
                    </div>
                  </button>
                  
                  {/* Status Indicator & Deletion */}
                  <div className="absolute right-2 flex items-center gap-1 bg-gradient-to-l from-white dark:from-[#1d1916] via-white/90 dark:via-[#1d1916]/90 pl-4 py-1.5 rounded-r-xl">
                    <div className="shrink-0 mr-1.5">
                      {ch.status === "done" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" title="Traduit" />
                      )}
                      {ch.status === "translating" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping inline-block" title="Traduction d'IA en cours..." />
                      )}
                      {ch.status === "pending" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-stone-350 dark:bg-stone-600 inline-block" title="En attente" />
                      )}
                      {ch.status === "failed" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-605 bg-rose-600 inline-block" title="Échec de traduction" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChapter(ch.id);
                      }}
                      className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-stone-400 hover:text-rose-605 rounded-xl transition opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Supprimer ce chapitre"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Batch translation CTA panel at the bottom */}
        {selectedBatchIds.length > 0 && (
          <div className="pt-3 border-t border-amber-900/10 dark:border-stone-800 flex flex-col gap-2 flex-shrink-0">
            {hasApiKey ? (
              <button
                type="button"
                onClick={startBatchTranslation}
                disabled={isBatchTranslating || isTranslating}
                className="w-full py-3 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 disabled:from-stone-200 disabled:to-stone-200 disabled:text-stone-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm hover:translate-y-[-1px] cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isBatchTranslating ? 'animate-spin' : ''}`} />
                <span>{isBatchTranslating ? batchTranslationProgress : `Traduire le lot (${selectedBatchIds.length})`}</span>
              </button>
            ) : (
              <div className="bg-amber-50/60 dark:bg-amber-950/10 p-3 rounded-xl border border-amber-100 dark:border-stone-800/80 flex flex-col gap-2">
                <div className="text-[10px] uppercase font-bold text-amber-900 dark:text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>Traduire le lot en chat</span>
                </div>
                <div className="flex items-center gap-1 bg-white dark:bg-[#13100e] p-1.5 rounded-xl border border-amber-100/50 dark:border-stone-800">
                  <code className="text-[10px] text-amber-800 dark:text-amber-400 font-mono truncate flex-1 select-all pl-1">
                    /translate {selectedBatchIds.join(",")}
                  </code>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`/translate ${selectedBatchIds.join(",")}`);
                      setIsBatchCommandCopied(true);
                      setTimeout(() => setIsBatchCommandCopied(false), 2000);
                    }}
                    className="px-2 py-1 bg-amber-700 hover:bg-amber-600 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {isBatchCommandCopied ? "Copié !" : "Copier"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
 
      {/* RIGHT COLUMN: CORE WORKSPACE */}
      <div className="lg:col-span-8 flex flex-col h-full max-h-[720px] bg-white dark:bg-[#251e1a]/40 border border-stone-200/80 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
        {isAdding ? (
          /* FORM TO ADD CHAPTER */
          <form onSubmit={handleAddSubmit} className="p-6 flex flex-col gap-4 h-full animation-fadeIn bg-stone-50/10">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-stone-800 dark:text-stone-200 text-base">Ajouter un nouveau chapitre</h3>
              <p className="text-xs text-stone-500">Saisissez ou collez les chapitres originaux de votre Webnovel.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-605 dark:text-stone-300 text-[10px] font-bold tracking-wider mb-1">NUMÉRO DU CHAPITRE</label>
                <input
                  type="number"
                  required
                  value={newNum}
                  onChange={(e) => setNewNum(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#1d1916] border border-stone-205 dark:border-stone-800 rounded-xl p-3 text-xs text-stone-800 dark:text-stone-200 outline-none focus:border-amber-700 font-medium"
                />
              </div>
              <div>
                <label className="block text-stone-605 dark:text-stone-300 text-[10px] font-bold tracking-wider mb-1">TITRE DU CHAPITRE ORIGINEL</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ex. Éveil de l'Âme"
                  className="w-full bg-white dark:bg-[#1d1916] border border-stone-205 dark:border-stone-800 rounded-xl p-3 text-xs text-stone-800 dark:text-stone-200 outline-none focus:border-amber-700 font-medium"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <label className="block text-stone-605 dark:text-stone-300 text-[10px] font-bold tracking-wider mb-1">CONTENU TEXTUEL ORIGINAL (CN/KR/EN)</label>
              <textarea
                required
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Copiez-collez le texte brut du chapitre ici..."
                className="flex-1 w-full bg-white dark:bg-[#1d1916] border border-stone-205 dark:border-stone-800 rounded-xl p-4 text-xs text-stone-700 dark:text-stone-300 font-sans leading-relaxed outline-none focus:border-amber-700 resize-none font-medium"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-stone-100 dark:bg-stone-805 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-xl text-xs text-stone-600 dark:text-stone-300 transition font-semibold cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-shadow shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Importer le Chapitre</span>
              </button>
            </div>
          </form>
        ) : selectedChapter ? (
          /* WORKSPACE CORE */
          <div className="flex flex-col h-full">
            {/* Top Toolbar */}
            <div className="bg-stone-50/50 dark:bg-stone-900/30 p-4 border-b border-stone-150 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-stone-400 dark:text-stone-550 font-bold tracking-wider uppercase font-sans">
                  CONTRÔLE & SYNC DE LORE
                </span>
                <h3 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-200">
                  Chapitre {selectedChapter.number} : {selectedChapter.title}
                </h3>
              </div>

              {/* Actions & Translation trigger */}
              <div className="flex items-center gap-2.5">
                {hasApiKey ? (
                  <button
                    disabled={isTranslating}
                    onClick={() => onTranslateChapter(selectedChapter.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow transition active:scale-95 duration-200 cursor-pointer ${
                      isTranslating
                        ? "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed animate-pulse"
                        : "bg-amber-700 hover:bg-amber-600 text-white shadow-sm"
                    }`}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isTranslating ? "animate-spin" : ""}`} />
                    <span>
                      {isTranslating ? "Traduction..." : "Traduire en 3 Étapes"}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`/translate ${selectedChapter.id}`);
                      setIsCommandCopied(true);
                      setTimeout(() => setIsCommandCopied(false), 3000);
                    }}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl border flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                      isCommandCopied
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-amber-50 hover:bg-amber-100/50 border-amber-200 text-amber-800"
                    }`}
                    title="Copie la commande pour coller à droite"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isCommandCopied ? "Fait !" : "Copier Commande"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Content Display split screen */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100 dark:divide-stone-800 overflow-hidden">
              
              {/* LEFT SIDE: Original text */}
              <div className="p-5 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2 mb-3">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Texte Brut ({selectedChapter.sourceLang})</span>
                  <span className="text-[10px] font-mono text-stone-400">{selectedChapter.originalText.length} Signes</span>
                </div>
                <div className="flex-1 overflow-y-auto text-sm font-sans text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line pr-1 max-h-[450px]">
                  {selectedChapter.originalText}
                </div>
              </div>

              {/* RIGHT SIDE: Simplified Translation Output */}
              <div className="p-5 flex flex-col h-full overflow-hidden bg-stone-50/20 dark:bg-stone-900/10">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2 mb-3">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Traduction Polie</span>
                  
                  {selectedChapter.translatedText && activeTab !== "edit" && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={startEditing}
                        className="p-1 px-2.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-amber-700 rounded-lg text-xs flex items-center gap-1 transition cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Corriger</span>
                      </button>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-stone-100 dark:hover:bg-stone-805 rounded-lg transition cursor-pointer"
                        title="Copier le texte poli"
                        id="btn-copy-poli"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-stone-100 dark:hover:bg-stone-805 rounded-lg transition cursor-pointer"
                        title="Télécharger .txt"
                        id="btn-download-txt"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-hidden flex flex-col">
                  {isTranslating ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full border-4 border-stone-100 border-t-amber-700 animate-spin mb-4" />
                      <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm mb-1">Traduction littéraire en cours...</h4>
                      <p className="text-xs text-stone-400 max-w-xs">
                        Nous analysons le lore, cartographions le glossaire et polissons l'art en 3 étapes.
                      </p>
                    </div>
                  ) : selectedChapter.status === "failed" ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-rose-550 gap-2">
                      <AlertTriangle className="w-8 h-8 opacity-80" />
                      <h4 className="font-bold text-sm">Échec lors de la traduction</h4>
                      <p className="text-xs text-stone-400 max-w-xs">{selectedChapter.error || "Une erreur est survenue."}</p>
                      <button
                        onClick={() => onTranslateChapter(selectedChapter.id)}
                        className="mt-3 px-4 py-1.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
                      >
                        Retenter le pipeline
                      </button>
                    </div>
                  ) : !selectedChapter.translatedText ? (
                    /* EMPTY VIEW */
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/10 text-amber-800 rounded-full">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <div className="max-w-xs">
                        <h4 className="font-bold text-stone-700 dark:text-stone-300 text-sm mb-1">Pas encore traduit</h4>
                        <p className="text-xs text-stone-400 leading-relaxed mb-4 font-sans">
                          Lancez la traduction de ce chapitre. Le glossaire de lore sera scrupuleusement intégré !
                        </p>
                        
                        {!hasApiKey && (
                          <div className="bg-amber-50/20 dark:bg-amber-950/10 border border-amber-100/50 dark:border-stone-800 rounded-xl p-4 text-left space-y-2">
                            <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                              <span>Comment faire ?</span>
                            </span>
                            <p className="text-[11px] text-stone-500 leading-normal">
                              Copiez la commande ci-dessous et collez-la directement dans le <strong>chat d’Antigravity</strong>. Je traduirai alors le chapitre !
                            </p>
                            <div className="flex items-center gap-1.5 bg-white dark:bg-[#13100e] p-2 rounded-xl border border-amber-100/40 dark:border-stone-800">
                              <code className="text-amber-800 dark:text-amber-400 text-xs font-mono flex-1 truncate select-all">
                                /translate {selectedChapter.id}
                              </code>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(`/translate ${selectedChapter.id}`);
                                  setIsCommandCopied(true);
                                  setTimeout(() => setIsCommandCopied(false), 2000);
                                }}
                                className="px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white font-sans text-[11px] font-bold rounded-lg cursor-pointer transition shrink-0 animate-pulse"
                              >
                                {isCommandCopied ? "Copié !" : "Copier"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : activeTab === "edit" ? (
                    <div className="flex-1 flex flex-col gap-3 min-h-0">
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="flex-1 w-full bg-white dark:bg-[#1d1916] border border-stone-200 dark:border-stone-800 rounded-xl p-4 text-xs leading-relaxed text-stone-800 dark:text-stone-200 outline-none focus:border-amber-700 resize-none font-sans"
                      />
                      <div className="flex justify-end gap-2 pt-2 border-t border-stone-105 dark:border-stone-800 shrink-0">
                        <button
                          onClick={() => setActiveTab("final")}
                          className="px-3.5 py-1.5 bg-white dark:bg-stone-805 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-500 dark:text-stone-300 text-xs font-semibold"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={saveEditing}
                          className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 rounded-xl text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Enregistrer les corrections</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* SIMPLIFIED TRANSLATED COLUMN: HIGH-RELIABILITY WITH VALIDATION SUMMARY ACCORDION */
                    <div className="flex-1 flex flex-col overflow-hidden">
                      {selectedChapter.validationNotes && (
                        <div className="mb-2 bg-amber-50/45 dark:bg-amber-950/10 p-2.5 rounded-xl border border-amber-100/50 dark:border-stone-800/60 text-[11px] text-stone-605 dark:text-stone-400">
                          <div className="font-bold font-sans text-amber-900 dark:text-amber-400 flex items-center gap-1 mb-0.5">
                            <Sparkles className="w-3 h-3 text-amber-700" />
                            <span>Contrôle qualité d'alignement :</span>
                          </div>
                          <p className="italic line-clamp-2">{selectedChapter.validationNotes}</p>
                        </div>
                      )}
                      
                      <div className="flex-1 overflow-y-auto font-serif text-[13px] sm:text-sm leading-relaxed text-stone-800 dark:text-stone-100 bg-white dark:bg-[#1d1916] p-4 rounded-xl border border-stone-100 dark:border-stone-805/85 whitespace-pre-line pr-2 selection:bg-amber-100 select-text max-h-[350px]">
                        {selectedChapter.translatedText}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* PLACEHOLDER */
          <div className="p-10 text-center text-stone-400 dark:text-stone-500 flex flex-col items-center justify-center gap-3 h-full">
            <FileText className="w-12 h-12 text-stone-200 dark:text-stone-800 mb-2" />
            <h4 className="font-bold text-stone-700 dark:text-stone-300 text-sm">Aucun Chapitre Sélectionné</h4>
            <p className="text-xs text-stone-400 dark:text-stone-500 max-w-sm">
              Sélectionnez un chapitre dans la barre latérale gauche pour charger le texte source, gérer les traductions ou corriger la prose finale.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
