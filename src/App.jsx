import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Square, 
  Circle, 
  Type, 
  Download, 
  Moon, 
  Sun, 
  Trash2, 
  ZoomIn, 
  ZoomOut,
  Maximize,
  FileJson
} from 'lucide-react';
import CustomNode from './components/CustomNode';
import Sidebar from './components/Sidebar';

// Definição dos tipos de nós personalizados
const nodeTypes = {
  customRect: CustomNode,
  customCircle: CustomNode,
  customText: CustomNode,
};

const initialNodes = [];
const initialEdges = [];

const ArchCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('# Documentação\n\nDescreva sua arquitetura aqui...\n\n## Como usar\n\n- Clique nos ícones da barra superior para adicionar formas\n- Arraste das bordas (pontos) para criar conexões\n- Clique duplo para editar o texto\n- Use o botão de tema para alternar entre claro/escuro');
  const [showSidebar, setShowSidebar] = useState(true);

  // Carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Alternar Tema
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Adicionar Nós
  const addNode = useCallback((type) => {
    if (!reactFlowInstance) return;

    const position = {
      x: Math.random() * 400 + 100,
      y: Math.random() * 400 + 100,
    };

    const newNode = {
      id: `${type}-${Date.now()}`,
      type: `custom${type.charAt(0).toUpperCase() + type.slice(1)}`,
      position,
      data: { 
        label: `${type === 'rect' ? 'Retângulo' : type === 'circle' ? 'Círculo' : 'Texto'} ${nodes.length + 1}`,
        type 
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [reactFlowInstance, nodes.length, setNodes]);

  // Conectar Nós (Setas Inteligentes)
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: darkMode ? '#94a3b8' : '#475569', strokeWidth: 2 },
        markerEnd: {
          type: 'arrowclosed',
          color: darkMode ? '#94a3b8' : '#475569',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, darkMode]
  );

  // Exportar como Imagem
  const exportImage = useCallback(async () => {
    if (!reactFlowInstance) return;
    try {
      const blob = await reactFlowInstance.toBlob({ 
        backgroundColor: darkMode ? '#0f172a' : '#ffffff',
        padding: 50
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'arquitetura.png';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao exportar", err);
      alert("Erro ao gerar imagem. Tente novamente.");
    }
  }, [reactFlowInstance, darkMode]);

  // Exportar como JSON
  const exportJSON = useCallback(() => {
    const flowData = JSON.stringify({ nodes, edges, markdownContent }, null, 2);
    const blob = new Blob([flowData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'arquitetura.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges, markdownContent]);

  // Limpar Canvas
  const clearCanvas = () => {
    if(window.confirm("Tem certeza que deseja limpar todo o canvas?")) {
      setNodes([]);
      setEdges([]);
    }
  };

  // Controles de Zoom
  const handleZoomIn = () => reactFlowInstance?.zoomIn();
  const handleZoomOut = () => reactFlowInstance?.zoomOut();
  const handleFitView = () => reactFlowInstance?.fitView();

  return (
    <div className={`flex flex-col h-screen w-full overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      
      {/* Navbar Superior */}
      <header className={`h-16 border-b flex items-center justify-between px-6 z-20 shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md">A</div>
          <h1 className="font-semibold text-xl tracking-tight">ArchiCanvas</h1>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl shadow-inner">
          <button onClick={() => addNode('rect')} className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm hover:shadow" title="Adicionar Retângulo">
            <Square size={18} className="text-slate-700 dark:text-slate-300" />
          </button>
          <button onClick={() => addNode('circle')} className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm hover:shadow" title="Adicionar Círculo">
            <Circle size={18} className="text-slate-700 dark:text-slate-300" />
          </button>
          <button onClick={() => addNode('text')} className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm hover:shadow" title="Adicionar Texto">
            <Type size={18} className="text-slate-700 dark:text-slate-300" />
          </button>
          <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></div>
          <button onClick={handleZoomIn} className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all" title="Zoom In"><ZoomIn size={18} className="text-slate-700 dark:text-slate-300" /></button>
          <button onClick={handleZoomOut} className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all" title="Zoom Out"><ZoomOut size={18} className="text-slate-700 dark:text-slate-300" /></button>
          <button onClick={handleFitView} className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all" title="Ajustar Visão"><Maximize size={18} className="text-slate-700 dark:text-slate-300" /></button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className={`p-2.5 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'}`} title="Alternar Tema">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={exportImage} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg">
            <Download size={16} /> Exportar
          </button>
          <button onClick={() => setShowSidebar(!showSidebar)} className={`p-2.5 rounded-lg transition-colors ${showSidebar ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`} title="Documentação">
            <FileJson size={20} />
          </button>
        </div>
      </header>

      {/* Área Principal */}
      <div className="flex-1 flex relative overflow-hidden">
        <div className="flex-1 relative h-full">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              connectionMode={ConnectionMode.Loose}
              fitView
              snapToGrid={true}
              snapGrid={[15, 15]}
              deleteKeyCode={['Backspace', 'Delete']}
              defaultEdgeOptions={{
                type: 'smoothstep',
                animated: true,
                style: { stroke: darkMode ? '#94a3b8' : '#475569', strokeWidth: 2 },
              }}
              className={`transition-colors duration-300 ${darkMode ? 'dark bg-slate-950' : 'bg-white'}`}
            >
              <Background 
                color={darkMode ? '#334155' : '#e2e8f0'} 
                gap={20} 
                size={1} 
                pattern="dots" 
              />
              <Controls className="!bg-white !dark:bg-slate-800 !border !border-slate-200 !dark:border-slate-700 !rounded-lg !shadow-lg" />
              <MiniMap 
                nodeColor={darkMode ? '#475569' : '#cbd5e1'} 
                maskColor={darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
                className={`!rounded-lg !shadow-lg !border ${darkMode ? '!bg-slate-900 !border-slate-800' : '!bg-white !border-slate-200'}`}
              />
            </ReactFlow>
          </ReactFlowProvider>
          
          {/* Floating Action Button para Limpar */}
          <button 
            onClick={clearCanvas}
            className="absolute bottom-6 right-6 p-3 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:scale-110 z-10"
            title="Limpar Canvas"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Sidebar de Documentação */}
        {showSidebar && (
          <Sidebar 
            markdownContent={markdownContent} 
            setMarkdownContent={setMarkdownContent} 
            darkMode={darkMode}
            onClose={() => setShowSidebar(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ArchCanvas;
