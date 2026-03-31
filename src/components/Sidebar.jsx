import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar({ isOpen, onToggle, nodes, edges, onUpdateNodeLabel }) {
  const [markdown, setMarkdown] = useState(`# Documentation

## Architecture Overview

This is your architecture diagram documentation.

### Components
- Add notes about your design
- Document decisions
- Link to resources

### Instructions
- **Double-click** on any node to edit its label
- **Drag** from handles to create connections
- **Select shapes** from the toolbar and click on canvas to add
- Use the **Export** buttons to save your work
`);

  return (
    <div
      className={`fixed right-0 top-0 h-full bg-white border-l border-gray-200 shadow-lg transition-all duration-300 z-20 ${
        isOpen ? 'w-96' : 'w-10'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-3 top-4 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        {isOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {isOpen && (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Documentation & Notes
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Write in Markdown, preview in real-time
            </p>
          </div>

          {/* Editor and Preview */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-48 p-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                placeholder="Write your markdown here..."
              />
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
                <div className="prose prose-sm max-w-none p-4 bg-gray-50 rounded-md border border-gray-200 min-h-[200px]">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              </div>

              {/* Diagram Info */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Diagram Elements
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Nodes</span>
                    <span className="text-sm font-medium text-gray-800">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Connections</span>
                    <span className="text-sm font-medium text-gray-800">{edges.length}</span>
                  </div>
                </div>
              </div>

              {/* Node List */}
              {nodes.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Nodes (double-click to edit)
                  </h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {nodes.map((node) => (
                      <div
                        key={node.id}
                        className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded hover:bg-gray-50"
                      >
                        <input
                          type="text"
                          value={node.data.label}
                          onChange={(e) => onUpdateNodeLabel(node.id, e.target.value)}
                          className="flex-1 text-sm border-none bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Tip: Use Markdown for rich formatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
