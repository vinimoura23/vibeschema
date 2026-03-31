# 🏗️ ArchiCanvas - Editor de Arquitetura de Software

Um editor visual moderno e minimalista para criação de diagramas de arquitetura de software, construído com React, Tailwind CSS e React Flow.

![ArchiCanvas](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![React Flow](https://img.shields.io/badge/React_Flow-12-0066cc)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?logo=docker)

## ✨ Funcionalidades

### 🎨 Canvas Interativo
- **Formas Variadas**: Retângulos, Círculos, Texto, Diamantes (decisão), Hexágonos
- **Conexões Inteligentes**: Setas que se conectam automaticamente aos nós
- **Arrastar e Soltar**: Movimente formas livremente pelo canvas
- **Edição por Clique Duplo**: Edite rótulos diretamente nas formas
- **Grid de Pontos**: Fundo com grid discreto para alinhamento preciso

### 🎯 Ferramentas Avançadas
- **Undo/Redo**: Ctrl+Z / Ctrl+Y para desfazer/refazer ações
- **Modo Desenho**: Pressione `D` para ativar e desenhar à mão livre
- **Seletor de Cores**: Personalize cores das formas e linhas
- **Controle de Espessura**: Ajuste a espessura das bordas e conexões
- **Zoom e Pan**: Controles completos de navegação

### 📁 Gerenciamento de Projetos
- **Salvar Projetos**: Salve seus diagramas no localStorage
- **Carregar Projetos**: Acesse projetos salvos rapidamente
- **Excluir Projetos**: Gerencie seu espaço de armazenamento
- **Exportação**: PNG para imagens, JSON para backup/compartilhamento

### 📝 Documentação Integrada
- **Editor Markdown**: Escreva documentação ao lado do diagrama
- **Preview em Tempo Real**: Visualize a formatação instantaneamente
- **Estatísticas**: Conte de nós e conexões em tempo real

### 🌙 Dark Mode
- **Tema Escuro/Claro**: Alternância suave com persistência
- **Cores Adaptativas**: Toda a interface se adapta ao tema selecionado

## 🚀 Quick Start com Docker

### Opção 1: Docker Compose (Recomendado)

```bash
# Construir e iniciar o container
docker compose up -d --build

# Acessar a aplicação
# http://localhost:3000

# Ver logs
docker compose logs -f

# Parar
docker compose down
```

### Opção 2: Docker Direto

```bash
# Construir a imagem
docker build -t arch-canvas .

# Executar o container
docker run -d -p 3000:80 --name arch-canvas-app arch-canvas

# Acessar
# http://localhost:3000

# Parar e remover
docker stop arch-canvas-app && docker rm arch-canvas-app
```

## 💻 Desenvolvimento Local

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone <url-do-repositorio>
cd workspace

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

A aplicação estará disponível em `http://localhost:5173`

## 📖 Como Usar

### Adicionar Formas
1. Clique em um ícone de forma na barra superior (Retângulo, Círculo, Texto, etc.)
2. Clique em qualquer lugar do canvas para adicionar a forma
3. Ou simplesmente clique no ícone e a forma será adicionada no centro

### Conectar Elementos
1. Passe o mouse sobre uma forma para ver os pontos de conexão (handles)
2. Clique e arraste de um ponto até outro nó
3. Solte para criar a conexão com seta inteligente

### Editar Conteúdo
- **Rótulos**: Clique duplo em qualquer forma para editar o texto
- **Cores**: Use o seletor de cores na barra superior
- **Espessura**: Ajuste no slider do seletor de cores

### Atalhos de Teclado
| Atalho | Ação |
|--------|------|
| `Ctrl+Z` | Desfazer |
| `Ctrl+Shift+Z` ou `Ctrl+Y` | Refazer |
| `D` | Ativar/Desativar modo desenho |
| `Delete` ou `Backspace` | Remover elementos selecionados |

### Gerenciar Projetos
1. Clique em "Salvar" para salvar o projeto atual
2. Clique no ícone de pasta para abrir o gerenciador
3. Selecione um projeto para carregar ou exclua os indesejados

## 🛠️ Tecnologias

- **React 19** - Biblioteca UI principal
- **React Flow** - Canvas interativo e conexões
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones modernos
- **React Markdown** - Renderização de Markdown
- **Vite** - Build tool e dev server

## 📁 Estrutura do Projeto

```
/workspace/
├── src/
│   ├── App.jsx                 # Componente principal
│   ├── components/
│   │   ├── CustomNode.jsx      # Nós customizados do canvas
│   │   ├── Sidebar.jsx         # Painel de documentação
│   │   └── ProjectManager.jsx  # Gerenciador de projetos
│   ├── index.css               # Estilos globais
│   └── main.jsx                # Entry point
├── public/                     # Arquivos estáticos
├── Dockerfile                  # Configuração Docker
├── docker-compose.yml          # Orquestração Docker
├── package.json                # Dependências
├── tailwind.config.js          # Configuração Tailwind
└── README.md                   # Esta documentação
```

## 🔧 Troubleshooting Docker

### Erro: `npm ci` falha
O Dockerfile usa `npm install` em vez de `npm ci` para evitar problemas com lockfile.

### Erro: Porta já em uso
Altere a porta no `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Mude 3000 para 8080
```

### Container não inicia
Verifique os logs:
```bash
docker compose logs
```

## 📝 Licença

MIT License - sinta-se livre para usar e modificar.

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra issues e pull requests para melhorias.

---

Feito com ❤️ usando React + Tailwind CSS
