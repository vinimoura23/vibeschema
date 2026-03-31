import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Edit3, Eye, Palette } from 'lucide-react';

export default function Sidebar({ markdownContent, setMarkdownContent, darkMode, onClose, nodes, edges, updateNodeColor }) {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className={`w-96 h-full border-l shadow-xl flex flex-col ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Documentação</h2>
        <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}>
          <X size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            activeTab === 'editor'
              ? darkMode ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/50' : 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Edit3 size={16} /> Editor
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? darkMode ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/50' : 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Eye size={16} /> Preview
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'editor' ? (
          <textarea
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            placeholder="Escreva em Markdown..."
            className={`w-full h-full min-h-[400px] p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
              darkMode 
                ? 'bg-slate-800 text-white placeholder-slate-500 border-slate-700' 
                : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-200'
            } border`}
          />
        ) : (
          <div className={`prose prose-sm max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Stats & Node Colors */}
      <div className={`p-4 border-t ${darkMode ? 'border-slate-800 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Nós</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{nodes.length}</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Conexões</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{edges.length}</p>
          </div>
        </div>

        {/* Node Color Customization */}
        {nodes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette size={16} className={darkMode ? 'text-slate-400' : 'text-slate-600'} />
              <p className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Cores dos Nós</p>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {nodes.slice(0, 10).map((node) => (
                <div key={node.id} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={node.data?.bgColor || '#3b82f6'}
                    onChange={(e) => updateNodeColor(node.id, e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0"
                  />
                  <span className={`text-xs truncate flex-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {node.data?.label || node.id}
                  </span>
                </div>
              ))}
              {nodes.length > 10 && (
                <p className={`text-xs text-center ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  +{nodes.length - 10} nós (clique duplo no canvas para editar)
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
