import { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Sidebar from './components/Sidebar';
import CustomNode from './components/CustomNode';
import Toolbar from './components/Toolbar';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [];
const initialEdges = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTool, setSelectedTool] = useState(null);
  const reactFlowWrapper = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: false }, eds)),
    [setEdges]
  );

  const addNode = useCallback(
    (type, position) => {
      const newNode = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: { 
          label: `${type} ${nodes.length + 1}`,
          shape: type,
        },
        style: {
          width: type === 'text' ? 150 : 120,
          height: type === 'text' ? 60 : 80,
        },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, nodes.length]
  );

  const handleCanvasClick = useCallback(
    (event) => {
      if (!selectedTool || !reactFlowWrapper.current) return;
      
      // Only add node if clicking directly on canvas (not on existing node)
      if (event.target.classList.contains('react-flow__pane')) {
        const rect = reactFlowWrapper.current.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left - 60,
          y: event.clientY - rect.top - 40,
        };
        addNode(selectedTool, position);
        setSelectedTool(null);
      }
    },
    [selectedTool, addNode]
  );

  const updateNodeLabel = useCallback((nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, label: newLabel },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const exportAsJSON = useCallback(() => {
    const data = { nodes, edges };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'architecture-diagram.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const exportAsPNG = useCallback(async () => {
    alert('PNG Export: In a production app, this would use html2canvas to export the diagram as PNG.');
  }, []);

  return (
    <div className="flex h-screen w-full">
      <div 
        ref={reactFlowWrapper}
        className="flex-1 h-full grid-bg relative"
        onClick={handleCanvasClick}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={['Backspace', 'Delete']}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: false,
            style: { stroke: '#6b7280', strokeWidth: 2 },
          }}
        >
          <Controls className="bg-white border border-gray-200 rounded-lg shadow-sm" />
          <Background color="#e5e7eb" gap={20} size={1} />
        </ReactFlow>

        <Toolbar 
          selectedTool={selectedTool} 
          onSelectTool={setSelectedTool}
          onExportJSON={exportAsJSON}
          onExportPNG={exportAsPNG}
        />
      </div>

      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        nodes={nodes}
        edges={edges}
        onUpdateNodeLabel={updateNodeLabel}
      />
    </div>
  );
}
