import { Folder, Trash2, FileText, Plus, X } from 'lucide-react';

export default function ProjectManager({ projects, onLoadProject, onDeleteProject, onNewProject, onClose, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className={`w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <Folder className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Gerenciador de Projetos</h2>
          </div>
          <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* New Project Button */}
          <button
            onClick={onNewProject}
            className="w-full mb-6 p-4 border-2 border-dashed rounded-xl flex items-center justify-center gap-2 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
          >
            <Plus className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-blue-600">Criar Novo Projeto</span>
          </button>

          {/* Projects List */}
          {projects.length === 0 ? (
            <div className={`text-center py-12 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhum projeto salvo</p>
              <p className="text-sm mt-1">Crie seu primeiro projeto para começar</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 rounded-xl border transition-all hover:shadow-md group ${
                    darkMode 
                      ? 'bg-slate-800 border-slate-700 hover:border-blue-500' 
                      : 'bg-white border-slate-200 hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => onLoadProject(project)}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                        <FileText className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {project.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {project.nodes?.length || 0} nós • {project.edges?.length || 0} conexões
                        </p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {new Date(project.updatedAt).toLocaleDateString('pt-BR', { 
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onLoadProject(project)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      >
                        Abrir
                      </button>
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${darkMode ? 'border-slate-800 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
          <p className={`text-sm text-center ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Os projetos são salvos no armazenamento local do navegador
          </p>
        </div>
      </div>
    </div>
  );
}
