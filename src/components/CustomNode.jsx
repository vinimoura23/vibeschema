import { memo, useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

export default memo(({ id, data, selected }) => {
  const { setNodes } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label || '');
  const nodeType = data.type || 'rect';
  const bgColor = data.bgColor || '#ffffff';
  const strokeWidth = data.strokeWidth || 2;

  useEffect(() => {
    setEditValue(data.label || '');
  }, [data.label]);

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(data.label || '');
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== '') {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return { ...node, data: { ...node.data, label: editValue } };
          }
          return node;
        })
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(data.label || '');
    }
  };

  // Estilos baseados no tipo de nó
  const getShapeStyles = () => {
    const base = `relative flex items-center justify-center px-4 py-3 min-w-[120px] min-h-[60px] transition-all border-2 ${
      selected ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:shadow-lg'
    }`;
    
    switch (nodeType) {
      case 'circle':
        return `${base} rounded-full`;
      case 'diamond':
        return `${base} rotate-45`;
      case 'hexagon':
        return `${base} clip-path-hexagon`;
      case 'text':
        return `${base} bg-transparent border-none shadow-none`;
      default:
        return `${base} rounded-md`;
    }
  };

  const getBgStyle = () => {
    if (nodeType === 'text') return {};
    return { backgroundColor: bgColor, borderWidth: strokeWidth };
  };

  const getTextClass = () => {
    const isLight = ['#ffffff', '#f0f9ff', '#fef2f2', '#fffbeb'].includes(bgColor?.toLowerCase());
    return `text-center text-sm font-medium ${nodeType === 'text' ? 'text-slate-900 dark:text-white font-semibold' : isLight ? 'text-slate-800 dark:text-slate-100' : 'text-white'}`;
  };

  return (
    <div className={getShapeStyles()} onDoubleClick={handleDoubleClick} style={getBgStyle()}>
      {/* Handles para conexões */}
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white dark:!border-slate-800 hover:!bg-blue-500 transition-colors" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white dark:!border-slate-800 hover:!bg-blue-500 transition-colors" />
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white dark:!border-slate-800 hover:!bg-blue-500 transition-colors" />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white dark:!border-slate-800 hover:!bg-blue-500 transition-colors" />

      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full text-center text-sm bg-white dark:bg-slate-700 border-2 border-blue-500 rounded outline-none px-2 py-1 text-slate-900 dark:text-white"
        />
      ) : (
        <div className={getTextClass()} style={nodeType === 'diamond' ? { transform: 'rotate(-45deg)' } : {}}>
          {data.label || 'Clique duplo para editar'}
        </div>
      )}
    </div>
  );
});
