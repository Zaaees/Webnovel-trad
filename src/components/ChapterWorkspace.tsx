import React, { useState } from "react";
import { 
  FileText, Plus, Sparkles, Send, AlertTriangle, 
  Eye, FileDown, Edit3, Save, Copy, Check, Trash2, 
  Maximize2, Minimize2, ZoomIn, ZoomOut, Type
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

  // Distraction-Free Reader Mode states
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [readerTheme, setReaderTheme] = useState<"cream" | "sepia" | "white" | "dark">("cream");
  const [readerFontSize, setReaderFontSize] = useState<number>(18); // default font size in px

  // Batch translation states
  const [selectedBatchIds, setSelectedBatchIds] = useState<string[]>([]);
  const [isBatchTranslating, setIsBatchTranslating] = useState(false);
  const [batchTranslationProgress, setBatchTranslationProgress] = useState<string>("");
  const [isBatchCommandCopied, setIsBatchCommandCopied] = useState(false);

  const handleSelectAll = () => {
    setSelectedBatchIds(chapters.map(c => c.id));
  };
  
  const handleSelectNone = () => {
    setSelectedBatchIds([]);
  };

  const handleSelectPending = () => {
    setSelectedBatchIds(chapters.filter(c => c.status !== "done").map(c => c.id));
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

  // Adjust reading themes CSS variables
  const getThemeClass = () => {
    switch (readerTheme) {
      case "sepia":
        return "bg-[#f4efe2] text-[#5c4a31] border-[#e8dfc4]";
      case "white":
        return "bg-white text-slate-800 border-slate-200";
      case "dark":
        return "bg-[#18181a] text-[#d4d4d8] border-[#27272a]";
      case "cream":
      default:
        return "bg-[#faf6eb] text-[#2c1f11] border-[#f0e7d5]";
    }
  };

  return (
    <div id="chapter-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[550px]">
      
      {/* LEFT COLUMN: CHAPTERS LIST */}
      <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-4 h-full max-h-[720px] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
          <h3 className="font-sans font-bold text-slate-800 text-sm tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>CHAPITRES</span>
          </h3>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="p-1 px-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg text-xs text-indigo-700 font-semibold flex items-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter</span>
          </button>
        </div>

        {/* Batch selection helper bar */}
        {chapters.length > 0 && (
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col gap-1.5 text-[11px] text-slate-500">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-750">{selectedBatchIds.length} sélectionné(s)</span>
              <div className="flex items-center gap-2 font-semibold">
                <button type="button" onClick={handleSelectAll} className="hover:text-indigo-650 text-indigo-600 transition">Tous</button>
                <span className="text-slate-300">|</span>
                <button type="button" onClick={handleSelectPending} className="hover:text-indigo-650 text-indigo-600 transition">Non-traduits</button>
                <span className="text-slate-300">|</span>
                <button type="button" onClick={handleSelectNone} className="hover:text-rose-600 text-slate-450 transition">Vider</button>
              </div>
            </div>
          </div>
        )}

        {/* Chapters Scrollable Area */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {chapters.length === 0 ? (
            <div className="text-center text-xs text-slate-400 py-10">
              Aucun chapitre importé.
            </div>
          ) : (
            chapters.map((ch) => {
              const works = ch.id === selectedChapterId;
              const isChecked = selectedBatchIds.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  className={`group relative flex items-center gap-2 rounded-xl border transition-all duration-150 ${
                    works
                      ? "bg-indigo-50/50 border-indigo-200 text-slate-800 shadow-sm"
                      : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <div className="pl-3 py-1 flex-shrink-0 flex items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleBatchId(ch.id)}
                      className="w-3.5 h-3.5 accent-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
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
                    className="flex-1 text-left py-3 pr-8 min-w-0"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                        Chapitre {ch.number}
                      </span>
                      <span className="font-sans font-medium text-xs truncate">
                        {ch.title}
                      </span>
                    </div>
                  </button>
                  
                  {/* Absolute positioning overlay controls for actions */}
                  <div className="absolute right-2 flex items-center gap-1.5 bg-gradient-to-l from-white via-white/90 group-hover:from-slate-50 group-hover:via-slate-50 pl-4 py-1.5 rounded-r-xl">
                    <div className="shrink-0 mr-1">
                      {ch.status === "done" && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Traduit" />
                      )}
                      {ch.status === "translating" && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping inline-block" title="Traduction..." />
                      )}
                      {ch.status === "pending" && (
                        <span className="w-2 h-2 rounded-full bg-slate-350 inline-block" title="En attente" />
                      )}
                      {ch.status === "failed" && (
                        <span className="w-2 h-2 rounded-full bg-rose-550 bg-rose-550 inline-block" title="Échec" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChapter(ch.id);
                      }}
                      className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition opacity-0 group-hover:opacity-100"
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
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {hasApiKey ? (
              <button
                type="button"
                onClick={startBatchTranslation}
                disabled={isBatchTranslating || isTranslating}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm hover:translate-y-[-1px]"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isBatchTranslating ? 'animate-spin' : ''}`} />
                <span>{isBatchTranslating ? batchTranslationProgress : `Traduire le lot (${selectedBatchIds.length})`}</span>
              </button>
            ) : (
              <div className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100 flex flex-col gap-2">
                <div className="text-[10px] uppercase font-bold text-indigo-750 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>Traduire en lot par chat</span>
                </div>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-indigo-100/50">
                  <code className="text-[10px] text-indigo-600 font-mono truncate flex-1 select-all pl-1">
                    /translate {selectedBatchIds.join(",")}
                  </code>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`/translate ${selectedBatchIds.join(",")}`);
                      setIsBatchCommandCopied(true);
                      setTimeout(() => setIsBatchCommandCopied(false), 2000);
                    }}
                    className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded transition-colors"
                  >
                    {isBatchCommandCopied ? "Fait !" : "Copier"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
 
      {/* RIGHT COLUMN: CORE WORKSPACE */}
      <div className="lg:col-span-9 flex flex-col h-full max-h-[720px] bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        {isAdding ? (
          /* FORM TO ADD CHAPTER */
          <form onSubmit={handleAddSubmit} className="p-6 flex flex-col gap-4 h-full animation-fadeIn bg-slate-50/20">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-sans font-bold text-slate-800 text-sm">Ajouter un nouveau chapitre</h3>
              <p className="text-xs text-slate-500">Saisissez ou collez les chapitres originaux de votre Webnovel.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1">NUMÉRO DU CHAPITRE</label>
                <input
                  type="number"
                  required
                  value={newNum}
                  onChange={(e) => setNewNum(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-indigo-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1">TITRE DU CHAPITRE</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ex. Éveil de l'Âme"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <label className="block text-slate-600 text-xs font-semibold mb-1">CONTENU TEXTUEL ORIGINAL (CN/KR/EN)</label>
              <textarea
                required
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Copiez-collez le texte brut du chapitre ici..."
                className="flex-1 w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-700 font-sans leading-relaxed outline-none focus:border-indigo-500 resize-none font-medium"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs text-slate-600 transition font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-shadow shadow-sm"
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
            <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase font-sans">
                  CONTRÔLE & SYNC DE LORE
                </span>
                <h3 className="font-sans text-sm font-bold text-slate-800">
                  Chapitre {selectedChapter.number} : {selectedChapter.title}
                </h3>
              </div>

              {/* Actions & Translation trigger */}
              <div className="flex items-center gap-2.5">
                {selectedChapter.translatedText && (
                  <button
                    onClick={() => setIsReadingMode(true)}
                    className="px-3.5 py-1.8 hover:bg-indigo-50 text-indigo-700 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition active:scale-95"
                    title="Lire en plein écran comme un livre papier"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Mode Lecture</span>
                  </button>
                )}

                {hasApiKey ? (
                  <button
                    disabled={isTranslating}
                    onClick={() => onTranslateChapter(selectedChapter.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow transition active:scale-95 duration-200 ${
                      isTranslating
                        ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed animate-pulse"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-155 cursor-pointer"
                    }`}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isTranslating ? "animate-spin" : ""}`} />
                    <span>
                      {isTranslating ? "Traduction..." : "Traduire en 3 Étapes"}
                    </span>
                  </button>
                ) : (
                  <div className="flex flex-col sm:items-end gap-1">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`/translate ${selectedChapter.id}`);
                        setIsCommandCopied(true);
                        setTimeout(() => setIsCommandCopied(false), 3000);
                      }}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl border flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                        isCommandCopied
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-indigo-50 hover:bg-indigo-100 border-indigo-100 text-indigo-700"
                      }`}
                      title="Copie la commande pour coller à droite"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isCommandCopied ? "Fait !" : "Copier Commande"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content Display split screen */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
              
              {/* LEFT SIDE: Original text */}
              <div className="p-5 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Texte de Source ({selectedChapter.sourceLang})</span>
                  <span className="text-[10px] font-mono text-slate-400">{selectedChapter.originalText.length} Signes</span>
                </div>
                <div className="flex-1 overflow-y-auto text-sm font-sans text-slate-705 text-slate-700 leading-relaxed whitespace-pre-line pr-1">
                  {selectedChapter.originalText}
                </div>
              </div>

              {/* RIGHT SIDE: Simplified Translation Output */}
              <div className="p-5 flex flex-col h-full overflow-hidden bg-slate-50/30">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Traduction Polie</span>
                  
                  {selectedChapter.translatedText && activeTab !== "edit" && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={startEditing}
                        className="p-1 px-2.5 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded-lg text-xs flex items-center gap-1 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Corriger</span>
                      </button>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                        title="Copier le texte poli"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                        title="Télécharger .txt"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-hidden flex flex-col">
                  {isTranslating ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin mb-4" />
                      <h4 className="font-bold text-slate-850 text-sm mb-1">Mélange terminologique en cours</h4>
                      <p className="text-xs text-slate-400 max-w-xs">
                        Nous analysons le lore secret, cartographions le glossaire et polissons l'art littéraire.
                      </p>
                    </div>
                  ) : selectedChapter.status === "failed" ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-rose-500 gap-2">
                      <AlertTriangle className="w-8 h-8 opacity-80" />
                      <h4 className="font-bold text-sm">Échec lors de la traduction</h4>
                      <p className="text-xs text-slate-400 max-w-xs">{selectedChapter.error || "Une erreur est survenue."}</p>
                      <button
                        onClick={() => onTranslateChapter(selectedChapter.id)}
                        className="mt-3 px-4 py-1.5 bg-white hover:bg-slate-550 hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-sm transition"
                      >
                        Retenter le pipeline
                      </button>
                    </div>
                  ) : !selectedChapter.translatedText ? (
                    /* EMPTY VIEW */
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <div className="max-w-xs">
                        <h4 className="font-bold text-slate-800 text-sm mb-1">Pas encore traduit</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          Lancez la traduction de ce chapitre. Le glossaire de lore sera automatiquement et scrupuleusement fusionné !
                        </p>
                        
                        {!hasApiKey && (
                          <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-left space-y-2">
                            <span className="text-[10px] uppercase font-bold text-indigo-700 flex items-center gap-1">
                              <span>Comment faire ?</span>
                            </span>
                            <p className="text-[11px] text-slate-500 leading-normal">
                              Copiez la commande ci-dessous et collez-la directement dans le <strong>chat d'Antigravity IDE</strong> (à droite). Je traduirai alors le chapitre en enrichissant le glossaire !
                            </p>
                            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-204">
                              <code className="text-indigo-600 text-xs font-mono flex-1 truncate select-all">
                                /translate {selectedChapter.id}
                              </code>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(`/translate ${selectedChapter.id}`);
                                  setIsCommandCopied(true);
                                  setTimeout(() => setIsCommandCopied(false), 2000);
                                }}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-[11px] font-bold rounded-lg cursor-pointer transition shrink-0"
                              >
                                {isCommandCopied ? "Fait !" : "Copier"}
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
                        className="flex-1 w-full bg-white border border-slate-200 rounded-xl p-4 text-xs leading-relaxed text-slate-800 outline-none focus:border-indigo-500 resize-none font-sans"
                      />
                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 shrink-0">
                        <button
                          onClick={() => setActiveTab("final")}
                          className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-500 text-xs font-semibold hover:bg-slate-50"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={saveEditing}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold text-xs transition flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Enregistrer les corrections</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* CLASSIC READING VIEW WITH LORA SERIF TEXT */
                    <div className="flex-1 overflow-y-auto font-serif text-sm leading-relaxed text-slate-700 bg-white p-4 rounded-xl border border-slate-100 grayscale hover:grayscale-0 transition whitespace-pre-line pr-2 selection:bg-amber-100 select-text">
                      {selectedChapter.translatedText}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* PLACEHOLDER */
          <div className="p-10 text-center text-slate-400 flex flex-col items-center justify-center gap-3 h-full">
            <FileText className="w-12 h-12 text-slate-200 mb-2" />
            <h4 className="font-bold text-slate-700 text-sm">Aucun Chapitre Sélectionné</h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Sélectionnez un chapitre dans la barre latérale gauche pour commencer la lecture, ou créez un nouveau chapitre à traduire.
            </p>
          </div>
        )}
      </div>

      {/* FULL-SCREEN IMMERSIVE READER MODE WINDOW */}
      {isReadingMode && selectedChapter && selectedChapter.translatedText && (
        <div className={`fixed inset-0 z-[100] flex flex-col ${getThemeClass()} transition-colors duration-200 select-text overflow-y-auto font-serif`}>
          
          {/* Reader HUD controls */}
          <div className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b ${
            readerTheme === "dark" ? "border-slate-800 bg-[#18181a]/95" : "border-slate-200/60 bg-[#faf6eb]/95"
          } backdrop-blur-sm shadow-sm flex-shrink-0`}>
            
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest opacity-60">Chapitre {selectedChapter.number}</span>
              <span className="opacity-40 font-sans">•</span>
              <h2 className="font-bold text-xs md:text-sm truncate max-w-[200px] md:max-w-sm font-sans">{selectedChapter.title}</h2>
            </div>

            {/* HUD Buttons */}
            <div className="flex items-center gap-4">
              {/* Theme selectors */}
              <div className="flex items-center gap-1.5 p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10">
                <button
                  onClick={() => setReaderTheme("cream")}
                  className={`w-5 h-5 rounded-full bg-[#faf6eb] border transition-transform ${
                    readerTheme === "cream" ? "scale-110 ring-2 ring-indigo-500 border-transparent" : "border-slate-300"
                  }`}
                  title="Thème Crème"
                />
                <button
                  onClick={() => setReaderTheme("sepia")}
                  className={`w-5 h-5 rounded-full bg-[#f4efe2] border transition-transform ${
                    readerTheme === "sepia" ? "scale-110 ring-2 ring-indigo-500 border-transparent" : "border-slate-300"
                  }`}
                  title="Thème Sépia"
                />
                <button
                  onClick={() => setReaderTheme("white")}
                  className={`w-5 h-5 rounded-full bg-white border transition-transform ${
                    readerTheme === "white" ? "scale-110 ring-2 ring-indigo-500 border-transparent" : "border-slate-200"
                  }`}
                  title="Thème Clair"
                />
                <button
                  onClick={() => setReaderTheme("dark")}
                  className={`w-5 h-5 rounded-full bg-[#27272a] border transition-transform ${
                    readerTheme === "dark" ? "scale-110 ring-2 ring-indigo-500 border-transparent" : "border-zinc-700"
                  }`}
                  title="Thème Sombre"
                />
              </div>

              {/* Font scaling controls */}
              <div className="flex items-center gap-1 border-r border-[#00000010] pr-3 mr-1 font-sans">
                <button
                  onClick={() => setReaderFontSize(size => Math.max(14, size - 1))}
                  className="p-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-sm font-bold flex items-center transition"
                  title="Diminuer la police"
                >
                  <ZoomOut className="w-4 h-4 mr-1 opacity-70" />
                  a
                </button>
                <span className="text-[11px] font-mono opacity-50 px-1 font-medium">{readerFontSize}px</span>
                <button
                  onClick={() => setReaderFontSize(size => Math.min(30, size + 1))}
                  className="p-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-sm font-bold flex items-center transition"
                  title="Agrandir la police"
                >
                  <ZoomIn className="w-4 h-4 mr-1 opacity-70" />
                  A
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsReadingMode(false)}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl font-sans text-xs font-semibold flex items-center gap-1 border border-black/10 transition"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Quitter</span>
              </button>
            </div>
          </div>

          {/* Book Content */}
          <div className="flex-1 py-12 md:py-16 px-6 md:px-12 flex justify-center w-full min-h-0 bg-transparent">
            <div className="w-full max-w-2xl flex flex-col font-serif">
              {/* Chapter Title Badge */}
              <div className="text-center mb-10 pb-8 border-b border-black/5 dark:border-white/5">
                <span className="block font-sans text-xs font-bold tracking-widest text-[#4f46e5]/80 uppercase mb-3">
                  Chapitre {selectedChapter.number}
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 font-serif">
                  {selectedChapter.title}
                </h1>
                <div className="w-12 h-1 bg-indigo-500/30 mx-auto mt-4 rounded" />
              </div>

              {/* Main Reading Paragraphs Body */}
              <div 
                style={{ fontSize: `${readerFontSize}px`, lineHeight: "1.85" }} 
                className="whitespace-pre-line text-justify select-text focus:outline-none flex-1 pb-24 font-serif selection:bg-indigo-300/30"
              >
                {selectedChapter.translatedText}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
