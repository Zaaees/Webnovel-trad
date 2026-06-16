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
    <div id="glossary-panel" className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
      {/* Panel Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <h3 className="font-sans font-semibold text-slate-200 text-sm tracking-wide">GLOSSAIRE DE COHÉRENCE</h3>
        </div>
        <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 font-mono text-[10px] rounded-full">
          {glossary.length} Termes
        </span>
      </div>

      {/* Operations bar */}
      <div className="p-3 border-b border-slate-800 flex flex-col sm:flex-row gap-2 bg-slate-900/60">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un terme..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 font-sans outline-none focus:border-indigo-500 transition"
          />
        </div>
        <div className="flex gap-1.5 items-center justify-end">
          <button
            onClick={() => { setIsAdding(!isAdding); setIsImporting(false); }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
              isAdding 
                ? "bg-slate-800 text-indigo-400 border border-slate-700" 
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouveau</span>
          </button>
          <button
            onClick={() => { setIsImporting(!isImporting); setIsAdding(false); }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
              isImporting 
                ? "bg-slate-800 text-amber-400 border border-slate-700" 
                : "bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Bulk</span>
          </button>
        </div>
      </div>

      {/* Drawer : Ajouter Terme */}
      {isAdding && (
        <div className="bg-slate-950 p-4 border-b border-slate-800 text-xs text-slate-300 space-y-3 animation-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-indigo-400 flex items-center gap-1">Ajouter un nouveau terme de Lore</h4>
            <button
              type="button"
              disabled={!original.trim() || isAiLoading}
              onClick={handleAutoFill}
              className={`px-2 py-1 rounded font-medium flex items-center gap-1 text-[11px] transition ${
                original.trim()
                  ? "bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-8050 cursor-pointer"
                  : "bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed"
              }`}
              title="Fournissez le terme original, et l'IA devinera instantanément la meilleure traduction et écrira la définition bilingue."
            >
              <Sparkles className={`w-3.5 h-3.5 text-indigo-400 ${isAiLoading ? "animate-spin" : ""}`} />
              <span>{isAiLoading ? "Déduction..." : "🤖 Auto-générer la traduction"}</span>
            </button>
          </div>

          {aiError && (
            <p className="text-rose-400 text-[10px] bg-rose-950/20 p-2 rounded border border-rose-950">{aiError}</p>
          )}

          <form onSubmit={handleAddSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500 text-[10px] mb-1">TERME ORIGINAL (EN/CN)</label>
                <input
                  type="text"
                  required
                  value={original}
                  onChange={(e) => setOriginal(e.target.value)}
                  placeholder="ex. True Qi"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-[10px] mb-1">TRADUCTION EN FRANÇAIS</label>
                <input
                  type="text"
                  required
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  placeholder="ex. Qi Originel"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 text-[10px] mb-1">NOTE OU EXPLICATION CONTEXTUELLE</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ex. Énergie magique issue des méridiens célestes"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-900">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setOriginal("");
                  setTranslation("");
                  setNotes("");
                  setAiError("");
                }}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 rounded text-slate-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-medium flex items-center gap-1"
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
        <form onSubmit={handleBulkSubmit} className="bg-slate-950 p-4 border-b border-slate-800 text-xs text-slate-300 space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-amber-400 flex items-center gap-1">Importation en masse (Format CSV)</h4>
            <span className="text-[10px] text-slate-500">Separateur : Point-virgule (;)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Saisissez vos termes ligne par ligne au format : <code className="text-amber-300">TermeOriginal;Traduction;Note(facultative)</code>
          </p>
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            rows={5}
            placeholder={demoBulkFormat}
            className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono text-[11px] placeholder:text-slate-600 outline-none focus:border-amber-500"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsImporting(false)}
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 rounded text-slate-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-amber-600 hover:bg-amber-500 rounded text-slate-950 font-bold flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              <span>Importer</span>
            </button>
          </div>
        </form>
      )}

      {/* Terms list */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-850 p-1">
        {filteredGlossary.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2 h-full">
            <HelpCircle className="w-8 h-8 text-slate-700" />
            <p>Aucun terme trouvé dans le glossaire.</p>
            {!isAdding && (
              <button 
                onClick={() => setIsAdding(true)} 
                className="text-indigo-400 hover:underline mt-1"
              >
                Créer le tout premier terme
              </button>
            )}
          </div>
        ) : (
          filteredGlossary.map((entry) => (
            <div key={entry.id} className="p-3 hover:bg-slate-850/60 transition flex items-center justify-between text-xs group">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono bg-slate-950 text-indigo-300 px-2 py-0.5 rounded border border-slate-800 font-medium select-all">
                    {entry.original}
                  </span>
                  <span className="text-slate-400">➔</span>
                  <span className="font-sans text-slate-200 font-semibold bg-indigo-950/40 text-indigo-100 px-2 py-0.5 rounded select-all border border-indigo-950">
                    {entry.translation}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-[11px] text-slate-400 italic">
                    {entry.notes}
                  </p>
                )}
              </div>
              <button
                onClick={() => onDeleteEntry(entry.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                title="Supprimer la règle"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
