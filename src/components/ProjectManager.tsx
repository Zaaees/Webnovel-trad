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
    <div id="project-manager" className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
      
      {/* Top Shelf Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-sans font-bold text-slate-850 text-base tracking-tight">
              Bibliothèque de Traduction
            </h2>
            <p className="text-xs text-slate-500">Sélectionnez ou créez un roman de votre bibliothèque</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsCreating(!isCreating)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
            isCreating
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-100"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nouveau Roman</span>
        </button>
      </div>

      {/* Drawer: Add novel */}
      {isCreating ? (
        <form onSubmit={handleSubmit} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 animation-fadeIn">
          <div className="font-bold text-slate-800 text-sm">Ajouter un nouveau Webnovel à la bibliothèque</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">Nom du Roman</label>
              <input
                type="text"
                required
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                placeholder="ex. Lord of the Mysteries"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-850 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">Langue d'origine</label>
              <select
                value={projLang}
                onChange={(e) => setProjLang(e.target.value as "CN" | "EN" | "KR")}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-850 text-sm outline-none focus:border-indigo-500 cursor-pointer transition"
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
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-shadow shadow-sm"
            >
              Créer le Projet
            </button>
          </div>
        </form>
      ) : (
        /* STANDARD STATE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          <div className="lg:col-span-5 flex flex-col gap-1.5">
            <label className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              OEUVRE SÉLECTIONNÉE
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <select
                  value={selectedProjectId}
                  onChange={(e) => onSelectProject(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium outline-none cursor-pointer focus:border-indigo-500/80 transition-all"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {activeProject && (
                <button
                  type="button"
                  onClick={() => onDeleteProject(activeProject.id)}
                  className="p-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl transition cursor-pointer"
                  title="Supprimer ce Webnovel définitivement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Globe className="w-4 h-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">FLOW DE TRADUCTION</span>
                <span className="text-xs font-semibold text-slate-700">
                  {activeProject?.sourceLang === "CN" ? "Chinois (CN)" : activeProject?.sourceLang === "KR" ? "Coréen (KR)" : "Anglais (EN)"} <span className="inline-block px-1 font-normal text-slate-400">➔</span> Français
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Layers className="w-4 h-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">TERMES DU LORE</span>
                <span className="text-xs font-semibold text-slate-700">
                  {activeProject?.glossary.length || 0} règles terminologiques d'IA
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
