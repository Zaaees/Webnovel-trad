import React, { useState } from "react";
import { FolderKanban, Plus, Layers, Globe, Trash2, ArrowRight } from "lucide-react";
import { WebnovelProject } from "../types";

interface ProjectManagerProps {
  projects: WebnovelProject[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onCreateProject: (name: string, sourceLang: "CN" | "EN" | "KR") => void;
  onDeleteProject: (id: string) => void;
}

export default function ProjectManager({
  projects,
  selectedProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
}: ProjectManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [projName, setProjName] = useState("");
  const [projLang, setProjLang] = useState<"CN" | "EN" | "KR">("CN");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;
    onCreateProject(projName.trim(), projLang);
    setProjName("");
    setIsCreating(false);
  };

  const activeProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div id="project-manager" className="bg-white dark:bg-[#251e1a]/80 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 flex flex-col gap-5 shadow-sm transition-colors">
      
      {/* Top Shelf Header */}
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-805/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-500 rounded-xl">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-stone-850 dark:text-stone-100 text-base tracking-tight">
              Bibliothèque & Index des Œuvres
            </h2>
            <p className="text-xs text-stone-550 dark:text-stone-400">Sélectionnez ou déclarez un nouveau roman fantastique.</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsCreating(!isCreating)}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isCreating
              ? "bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-605 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
              : "bg-amber-700 hover:bg-amber-600 text-white shadow-sm"
          }`}
          id="btn-new-project-toggle"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Créer un roman</span>
        </button>
      </div>

      {/* Drawer: Add novel */}
      {isCreating ? (
        <form onSubmit={handleSubmit} className="bg-stone-50 dark:bg-[#1d1916]/80 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 animation-fadeIn">
          <div className="font-bold text-stone-800 dark:text-stone-100 text-sm">Ajouter un nouveau Webnovel à la bibliothèque</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            <div>
              <label className="block text-stone-600 dark:text-stone-350 text-xs font-bold mb-1.5">NOM DE L'ŒUVRE</label>
              <input
                type="text"
                required
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                placeholder="ex. Lord of the Mysteries"
                className="w-full bg-white dark:bg-[#1d1916] border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 text-stone-850 dark:text-stone-200 text-xs font-semibold outline-none focus:border-amber-700 transition"
                id="input-project-name"
              />
            </div>
            <div>
              <label className="block text-stone-600 dark:text-stone-350 text-xs font-bold mb-1.5">LANGUE INITIALE (SOURCE)</label>
              <select
                value={projLang}
                onChange={(e) => setProjLang(e.target.value as "CN" | "EN" | "KR")}
                className="w-full bg-white dark:bg-[#1d1916] border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-2.5 text-stone-850 dark:text-stone-200 text-xs font-semibold outline-none focus:border-amber-700 cursor-pointer transition font-sans"
                id="select-project-lang"
              >
                <option value="CN">Chinois (CN)</option>
                <option value="EN">Anglais (EN)</option>
                <option value="KR">Coréen (KR)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-white dark:bg-[#1d1916] hover:bg-stone-100 dark:hover:bg-stone-805 text-stone-605 dark:text-stone-305 border border-stone-200 dark:border-stone-800 rounded-xl text-xs font-semibold cursor-pointer transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs cursor-pointer transition shadow-sm"
              id="btn-project-submit"
            >
              Déclarer l'œuvre
            </button>
          </div>
        </form>
      ) : (
        /* STANDARD STATE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          <div className="lg:col-span-5 flex flex-col gap-1.5">
            <label className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider">
              OEUVRE ACTIVE EN BIBLIOTHÈQUE
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <select
                  value={selectedProjectId}
                  onChange={(e) => onSelectProject(e.target.value)}
                  className="w-full bg-stone-50 hover:bg-stone-100 dark:bg-[#1d1916] hover:dark:bg-[#1a1613] border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-800 dark:text-stone-200 font-bold outline-none cursor-pointer focus:border-amber-700 transition-all font-serif"
                  id="select-active-project"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sourceLang})
                    </option>
                  ))}
                </select>
              </div>
              
              {activeProject && (
                <button
                  type="button"
                  onClick={() => onDeleteProject(activeProject.id)}
                  className="p-3.5 bg-rose-50 hover:bg-rose-105 hover:bg-rose-100/55 dark:bg-rose-950/20 text-rose-600 border border-rose-100 dark:border-rose-950 rounded-xl transition cursor-pointer"
                  title="Supprimer ce Roman de votre bibliothèque locale"
                  id="btn-delete-project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50/50 dark:bg-[#1d1916]/40 p-4 rounded-xl border border-stone-200/50 dark:border-stone-805/80">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-450 rounded-xl">
                <Globe className="w-4 h-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] text-stone-400 dark:text-stone-500 font-bold tracking-wider uppercase">FLUX DE TRADUCTION</span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {activeProject?.sourceLang === "CN" ? "Chinois (CN)" : activeProject?.sourceLang === "KR" ? "Coréen (KR)" : "Anglais (EN)"} <span className="inline-block px-1 font-sans text-amber-700">➜</span> Français (FR)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-450 rounded-xl">
                <Layers className="w-4 h-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] text-stone-400 dark:text-stone-500 font-bold tracking-wider uppercase">TERMES DU LORE COHÉRENTS</span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {activeProject?.glossary.length || 0} définitions enregistrées
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
