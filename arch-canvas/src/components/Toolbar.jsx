import { Circle, Square, Type, Download } from 'lucide-react';

export default function Toolbar({ selectedTool, onSelectTool, onExportJSON, onExportPNG }) {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2">
        {/* Shape Tools */}
        <button
          onClick={() => onSelectTool(selectedTool === 'circle' ? null : 'circle')}
          className={`p-2 rounded-md transition-colors ${
            selectedTool === 'circle'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          title="Add Circle"
        >
          <Circle size={20} />
        </button>

        <button
          onClick={() => onSelectTool(selectedTool === 'rectangle' ? null : 'rectangle')}
          className={`p-2 rounded-md transition-colors ${
            selectedTool === 'rectangle'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          title="Add Rectangle"
        >
          <Square size={20} />
        </button>

        <button
          onClick={() => onSelectTool(selectedTool === 'text' ? null : 'text')}
          className={`p-2 rounded-md transition-colors ${
            selectedTool === 'text'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          title="Add Text"
        >
          <Type size={20} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Export Options */}
        <button
          onClick={onExportJSON}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
          title="Export as JSON"
        >
          <Download size={20} />
          <span className="ml-2 text-sm">JSON</span>
        </button>

        <button
          onClick={onExportPNG}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
          title="Export as PNG"
        >
          <span className="text-sm font-medium">PNG</span>
        </button>

        {selectedTool && (
          <div className="ml-4 text-sm text-blue-600 font-medium">
            Click on canvas to add {selectedTool}
          </div>
        )}
      </div>
    </div>
  );
}
