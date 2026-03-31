import { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

const shapeStyles = {
  circle: 'rounded-full',
  rectangle: 'rounded-md',
  text: 'rounded-none bg-transparent border-none shadow-none',
};

const shapeIcons = {
  circle: '●',
  rectangle: '■',
  text: 'T',
};

export default memo(({ id, data, selected }) => {
  const { setNodes } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(data.label);
  };

  const handleBlur = () => {
    setIsEditing(false);
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
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const shapeClass = shapeStyles[data.shape] || shapeStyles.rectangle;

  return (
    <div
      className={`relative flex items-center justify-center min-w-[120px] min-h-[60px] px-4 py-2 bg-white ${shapeClass} ${
        data.shape !== 'text' ? 'border-2 border-gray-300' : ''
      } ${selected ? 'ring-2 ring-blue-500 border-blue-500' : ''} transition-all cursor-pointer`}
      onDoubleClick={handleDoubleClick}
    >
      {/* Input handles for connections */}
      {data.shape !== 'text' && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
          />
          <Handle
            type="target"
            position={Position.Left}
            className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
          />
          <Handle
            type="source"
            position={Position.Right}
            className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
          />
        </>
      )}

      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full h-full text-center text-sm bg-transparent border border-blue-500 rounded outline-none"
        />
      ) : (
        <div className="text-center">
          {data.shape !== 'text' && (
            <span className="text-gray-400 text-xs block mb-1">
              {shapeIcons[data.shape]}
            </span>
          )}
          <span className="text-sm font-medium text-gray-800">{data.label}</span>
        </div>
      )}
    </div>
  );
});
