import React, { useState } from "react";
import { Search, Plus, BookOpen, Trash2, Edit2, Upload, Download, Check, HelpCircle, Sparkles } from "lucide-react";
import { GlossaryEntry } from "../types";

interface GlossaryPanelProps {
  glossary: GlossaryEntry[];
  onAddEntry: (entry: Omit<GlossaryEntry, "id">) => void;
  onDeleteEntry: (id: string) => void;
  onImportBulk: (rawText: string) => void;
  sourceLang: "CN" | "EN" | "KR";
}

export default function GlossaryPanel({ glossary, onAddEntry, onDeleteEntry, onImportBulk, sourceLang }: GlossaryPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  
  // Single entry form states
  const [original, setOriginal] = useState("");
  const [translation, setTranslation] = useState("");
  const [notes, setNotes] = useState("");

  // Bulk import states
  const [bulkInput, setBulkInput] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!original.trim() || !translation.trim()) return;
    
    onAddEntry({
      original: original.trim(),
      translation: translation.trim(),
      notes: notes.trim() || undefined,
    });
    setOriginal("");
    setTranslation("");
    setNotes("");
    setIsAdding(false);
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkInput.trim()) return;
    onImportBulk(bulkInput);
    setBulkInput("");
    setIsImporting(false);
  };

  const handleAutoFill = async () => {
    if (!original.trim()) return;
    setAiError("");
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/glossary/auto-fill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original: original.trim(), sourceLang })
      });
      const data = await response.json();
      if (data.success) {
        setTranslation(data.translation);
        setNotes(data.notes || "");
      } else {
        setAiError(data.error || "Échecs lors du contact avec l'IA.");
      }
    } catch (e: any) {
      setAiError(e.message || "Impossible d'accéder au serveur backend.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredGlossary = glossary.filter(entry => 
    entry.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.notes && entry.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const demoBulkFormat = `Klein Moretti;Klein Moretti;Protagoniste principal du roman, membre du chemin du Spectateur
True Qi;Qi Originel;Énergie magique spirituelle de cultivation
Spectator;Spectateur;Première séquence du chemin divin de la connaissance`;

  return (
    <div id="glossary-panel" className="bg-stone-50/50 dark:bg-[#251e1a]/80 border border-amber-100 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full max-h-[720px] transition-colors">
      
      {/* Panel Header */}
      <div className="bg-amber-100/30 dark:bg-[#1d1916] px-4 py-3.5 border-b border-amber-100 dark:border-stone-800/80 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-500" />
          <h3 className="font-sans font-bold text-amber-950 dark:text-stone-200 text-xs tracking-wide">GLOSSAIRE & TEXTES DE LORE</h3>
        </div>
        <span className="px-2.5 py-0.5 bg-amber-700/10 dark:bg-[#1d1916] text-amber-800 dark:text-amber-400 font-mono text-[10px] rounded-full border border-amber-700/10 dark:border-stone-750 font-bold">
          {glossary.length} Termes
        </span>
      </div>

      {/* Operations bar */}
      <div className="p-3.5 border-b border-amber-100/50 dark:border-stone-800 flex flex-col sm:flex-row gap-2 bg-stone-100/20 dark:bg-stone-900/10 flex-shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un terme..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#1d1916] border border-stone-200 dark:border-stone-800 rounded-xl text-xs text-stone-800 dark:text-stone-300 placeholder:text-stone-400 font-sans outline-none focus:border-amber-700 transition"
          />
        </div>
        <div className="flex gap-1.5 items-center justify-end">
          <button
            onClick={() => { setIsAdding(!isAdding); setIsImporting(false); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              isAdding 
                ? "bg-stone-200 dark:bg-stone-800 text-stone-805 border border-stone-300 dark:border-stone-700" 
                : "bg-amber-700 hover:bg-amber-600 text-white"
            }`}
            id="btn-glossary-new"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouveau</span>
          </button>
          <button
            onClick={() => { setIsImporting(!isImporting); setIsAdding(false); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              isImporting 
                ? "bg-stone-200 dark:bg-stone-800 text-stone-805 border border-stone-300 dark:border-stone-700" 
                : "bg-stone-100 hover:bg-stone-200 dark:bg-stone-805 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-350 border border-stone-250 dark:border-stone-800"
            }`}
            id="btn-glossary-import"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Drawer : Ajouter Terme */}
      {isAdding && (
        <div className="bg-amber-50/15 dark:bg-[#1d1916]/55 p-4 border-b border-amber-900/5 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 space-y-3 animation-fadeIn flex-shrink-0">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-amber-900 dark:text-amber-450 flex items-center gap-1 font-sans">Nouveau terme de Lore</h4>
            <button
              type="button"
              disabled={!original.trim() || isAiLoading}
              onClick={handleAutoFill}
              className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1 text-[10px] uppercase tracking-wide transition ${
                original.trim()
                  ? "bg-amber-700 hover:bg-amber-600 text-white cursor-pointer"
                  : "bg-stone-100 dark:bg-[#13100e] text-stone-400 border border-stone-200 dark:border-stone-805 cursor-not-allowed"
              }`}
              title="Fournissez le terme d'origine, et l'IA devinera instantanément la meilleure traduction française."
              id="btn-glossary-autofill"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAiLoading ? "animate-spin" : ""}`} />
              <span>{isAiLoading ? "Recherche..." : "Générer par IA"}</span>
            </button>
          </div>

          {aiError && (
            <p className="text-rose-600 dark:text-rose-400 text-[10px] bg-rose-50/50 dark:bg-[#1d1916] p-2 rounded border border-rose-100">{aiError}</p>
          )}

          <form onSubmit={handleAddSubmit} className="space-y-3 font-sans">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-stone-500 text-[9px] font-bold tracking-wider mb-1">TERME D'ORIGINE ({sourceLang})</label>
                <input
                  type="text"
                  required
                  value={original}
                  onChange={(e) => setOriginal(e.target.value)}
                  placeholder="ex. Spectator"
                  className="w-full px-3 py-2 bg-white dark:bg-[#1d1916] border border-stone-200 dark:border-stone-800 rounded-xl text-stone-800 dark:text-stone-200 placeholder:text-stone-400 outline-none focus:border-amber-700"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-[9px] font-bold tracking-wider mb-1">TRADUCTION EN FR</label>
                <input
                  type="text"
                  required
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  placeholder="ex. Spectateur"
                  className="w-full px-3 py-2 bg-white dark:bg-[#1d1916] border border-stone-200 dark:border-stone-800 rounded-xl text-stone-800 dark:text-stone-200 placeholder:text-stone-400 outline-none focus:border-amber-700"
                />
              </div>
            </div>
            <div>
              <label className="block text-stone-500 text-[9px] font-bold tracking-wider mb-1">NOTE EXPLICATIVE DE CONCEPT</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ex. Éveil divine de la séquence ésotérique"
                className="w-full px-3 py-2 bg-white dark:bg-[#1d1916] border border-stone-200 dark:border-stone-800 rounded-xl text-stone-800 dark:text-stone-200 placeholder:text-stone-400 outline-none focus:border-amber-700"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-amber-900/5 dark:border-stone-800">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setOriginal("");
                  setTranslation("");
                  setNotes("");
                  setAiError("");
                }}
                className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-xl font-bold cursor-pointer transition hover:bg-stone-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl flex items-center gap-1 cursor-pointer transition"
              >
                <Check className="w-3 h-3" />
                <span>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Drawer : Import Bulk CSV/TXT */}
      {isImporting && (
        <form onSubmit={handleBulkSubmit} className="bg-amber-50/15 dark:bg-[#1d1916]/55 p-4 border-b border-amber-900/5 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 space-y-3 flex-shrink-0">
          <div className="flex items-start justify-between">
            <h4 className="font-bold text-amber-900 dark:text-amber-450 flex items-center gap-1 font-sans">Importation en masse (CSV)</h4>
            <span className="text-[10px] text-stone-400">Séparateur: Point-virgule (;)</span>
          </div>
          <p className="text-[11px] text-stone-500 leading-normal">
            Saisissez vos termes ligne par ligne au format : <code className="bg-white dark:bg-[#13100e] px-1 py-0.5 rounded border border-stone-200 dark:border-stone-800 text-amber-800 dark:text-amber-400">Terme;Traduction;Note</code>
          </p>
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            rows={4}
            placeholder={demoBulkFormat}
            className="w-full p-2.5 bg-white dark:bg-[#1d1916] border border-stone-205 dark:border-stone-800 rounded-xl text-stone-800 dark:text-stone-200 font-mono text-[11px] placeholder:text-stone-400 outline-none focus:border-amber-700"
          />
          <div className="flex justify-end gap-2 pt-2 border-t border-amber-900/5 dark:border-stone-800 animate-fadeIn">
            <button
              type="button"
              onClick={() => setIsImporting(false)}
              className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-605 dark:text-stone-300 rounded-xl font-bold cursor-pointer transition hover:bg-stone-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl flex items-center gap-1 cursor-pointer transition"
            >
              <Check className="w-3 h-3" />
              <span>Importer</span>
            </button>
          </div>
        </form>
      )}

      {/* Terms list */}
      <div className="flex-1 overflow-y-auto divide-y divide-amber-100/30 dark:divide-stone-800 p-1 bg-white/40 dark:bg-transparent">
        {filteredGlossary.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 dark:text-stone-500 flex flex-col items-center justify-center gap-2 h-full max-h-[350px]">
            <HelpCircle className="w-8 h-8 text-amber-700/30 dark:text-stone-800 shrink-0" />
            <p className="font-sans">Aucun terme dans le glossaire.</p>
            {!isAdding && (
              <button 
                onClick={() => setIsAdding(true)} 
                className="text-amber-805 hover:underline mt-1 font-bold font-sans cursor-pointer"
              >
                Créer le tout premier terme
              </button>
            )}
          </div>
        ) : (
          filteredGlossary.map((entry) => (
            <div key={entry.id} className="p-3.5 hover:bg-stone-100/50 dark:hover:bg-[#1d1916] transition flex items-center justify-between text-xs group rounded-xl">
              <div className="space-y-1 pr-4 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono bg-amber-500/10 text-amber-900 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/10 dark:border-stone-800 text-[11px] font-bold select-all">
                    {entry.original}
                  </span>
                  <span className="text-stone-400 dark:text-stone-650 font-bold">➔</span>
                  <span className="font-sans text-stone-800 dark:text-stone-200 font-bold bg-[#faf6eb] dark:bg-[#1c1815] px-2 py-0.5 rounded select-all border border-stone-200 dark:border-stone-800">
                    {entry.translation}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-[11px] text-stone-500 dark:text-stone-450 italic font-sans font-medium line-clamp-2">
                    {entry.notes}
                  </p>
                )}
              </div>
              <button
                onClick={() => onDeleteEntry(entry.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-stone-550 hover:bg-stone-100/80 dark:hover:bg-stone-850/80 transition cursor-pointer"
                title="Supprimer la règle"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
