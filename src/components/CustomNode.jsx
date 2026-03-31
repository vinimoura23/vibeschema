import { memo, useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

const shapeStyles = {
  rect: 'rounded-md bg-white dark:bg-slate-800 border-2',
  circle: 'rounded-full bg-white dark:bg-slate-800 border-2',
  text: 'bg-transparent border-none shadow-none',
};

const shapeBorders = {
  rect: 'border-slate-300 dark:border-slate-600',
  circle: 'border-slate-300 dark:border-slate-600',
  text: '',
};

const shapeTextColors = {
  rect: 'text-slate-800 dark:text-slate-100',
  circle: 'text-slate-800 dark:text-slate-100',
  text: 'text-slate-900 dark:text-slate-100 font-semibold',
};

export default memo(({ id, data, selected }) => {
  const { setNodes } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label || '');
  const nodeType = data.type || 'rect';

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
            return {
              ...node,
              data: { ...node.data, label: editValue },
            };
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

  const baseClasses = `relative flex items-center justify-center px-4 py-3 min-w-[120px] min-h-[60px] transition-all ${shapeStyles[nodeType] || shapeStyles.rect} ${shapeBorders[nodeType] || shapeBorders.rect} ${selected ? 'ring-2 ring-blue-500 border-blue-500' : ''} hover:shadow-lg`;
  const textClasses = `text-center text-sm font-medium ${shapeTextColors[nodeType] || shapeTextColors.rect}`;

  return (
    <div
      className={baseClasses}
      onDoubleClick={handleDoubleClick}
      style={{
        borderRadius: nodeType === 'circle' ? '9999px' : nodeType === 'rect' ? '8px' : '0',
        minWidth: nodeType === 'text' ? 'auto' : '120px',
        minHeight: nodeType === 'text' ? 'auto' : '60px',
      }}
    >
      {/* Handles para conexões - todos os lados */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white dark:!border-slate-800 hover:!bg-blue-500 transition-colors"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white dark:!border-slate-800 hover:!bg-blue-500 transition-colors"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white dark:!border-slate-800 hover:!bg-blue-500 transition-colors"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white dark:!border-slate-800 hover:!bg-blue-500 transition-colors"
      />

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
        <div className={textClasses}>
          {data.label || 'Clique duplo para editar'}
        </div>
      )}
    </div>
  );
});
