# ArchiCanvas - Diagramas de Arquitetura

Um Web App moderno e minimalista para criação de diagramas de arquitetura de software com suporte a Dark Mode.

![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)
![Docker](https://img.shields.io/badge/Docker-Ready-green)

## 🚀 Quick Start com Docker

### Opção 1: Docker Compose (Recomendado)

```bash
# Construir e iniciar o container
docker compose up -d --build

# Acessar a aplicação
http://localhost:3000

# Ver logs
docker compose logs -f

# Parar
docker compose down
```

### Opção 2: Docker direto

```bash
# Construir a imagem
docker build -t arch-canvas .

# Rodar o container
docker run -d -p 3000:80 --name arch-canvas-app arch-canvas

# Acessar
http://localhost:3000

# Parar
docker stop arch-canvas-app && docker rm arch-canvas-app
```

## ✨ Funcionalidades

### Canvas Interativo
- **Dark Mode** - Alterne entre temas claro e escuro
- **Grid de pontos** - Fundo discreto para alinhamento
- **Formas**: Retângulos, Círculos e Texto
- **Conexões inteligentes** - Setas que grudam nos objetos
- **Arrastar e soltar** - Movimente elementos livremente
- **Edição por clique duplo** - Edite textos rapidamente
- **Zoom e Pan** - Navegue pelo canvas com facilidade
- **Snap to Grid** - Alinhamento automático

### Barra de Ferramentas Superior
- Botões para adicionar formas (Retângulo, Círculo, Texto)
- Controles de Zoom (In, Out, Fit View)
- Toggle de Dark/Light Mode
- Exportação PNG
- Toggle do Painel de Documentação

### Painel Lateral de Documentação
- Editor Markdown em tempo real
- Preview renderizado instantaneamente
- Tabs para alternar entre Editor e Preview
- Contador de caracteres
- Sintaxe destacada para código

### Exportação
- **PNG** - Exporta todo o canvas como imagem
- **JSON** - Salva o diagrama completo com documentação

## 🛠️ Tecnologias

- **React 19** - Framework UI
- **Vite** - Build tool ultra-rápida
- **Tailwind CSS 3** - Estilização utilitária
- **React Flow 11** - Canvas interativo e conexões
- **React Markdown** - Renderização de Markdown
- **Lucide React** - Ícones modernos
- **@tailwindcss/typography** - Prose styling

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

Acesso local: `http://localhost:5173`

## 📖 Como Usar

### Adicionar Formas
1. Clique nos ícones da barra superior (□ ○ T)
2. A forma aparecerá em posição aleatória no canvas
3. Arraste para reposicionar

### Criar Conexões
1. Passe o mouse sobre uma forma
2. Clique e arraste de um dos pontos (handles) nas bordas
3. Solte em outra forma para conectar
4. A seta será criada automaticamente

### Editar Textos
- **Clique duplo** em qualquer forma para editar
- Digite o novo texto
- Pressione **Enter** ou clique fora para salvar
- Pressione **Escape** para cancelar

### Navegação
- **Arraste** o canvas para navegar
- **Scroll** do mouse para zoom
- Use os botões de zoom na barra superior
- **MiniMap** no canto inferior direito para visão geral

### Documentação
1. Clique no ícone de arquivo na barra superior
2. Escreva em Markdown no editor
3. Alterne para a tab "Preview" para ver renderizado
4. O conteúdo é salvo junto com o diagrama no JSON

### Dicas
- Use **Backspace/Delete** para remover elementos selecionados
- O tema (claro/escuro) é salvo no localStorage
- Exporte frequentemente para não perder seu trabalho

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── components/
│   │   ├── CustomNode.jsx    # Nós customizados (Rect, Circle, Text)
│   │   └── Sidebar.jsx       # Painel de documentação Markdown
│   ├── App.jsx               # Componente principal + Navbar
│   ├── index.css             # Estilos globais + Tailwind
│   └── main.jsx              # Entry point
├── public/                   # Assets estáticos
├── Dockerfile                # Configuração Docker multi-stage
├── docker-compose.yml        # Orquestração Docker
├── package.json              # Dependências
├── tailwind.config.js        # Configuração Tailwind
├── vite.config.js            # Configuração Vite
└── README.md                 # Esta documentação
```

## 🔧 Configuração Docker

O projeto usa **multi-stage build** para otimizar o tamanho da imagem:

1. **Stage 1 (Builder)**: Node.js 20 Alpine para build
2. **Stage 2 (Production)**: Nginx Alpine para servir os arquivos estáticos

Porta exposta: `3000:80`

## 🎨 Customização

### Cores do Tema
As cores são configuradas via Tailwind no arquivo `tailwind.config.js`:
- Light mode: `slate` palette
- Dark mode: `slate-950` background

### Adicionar Novas Formas
1. Crie o componente em `src/components/`
2. Registre em `nodeTypes` no `App.jsx`
3. Adicione o botão na navbar

## 🐛 Troubleshooting

### Docker não inicia
```bash
# Verificar logs
docker compose logs

# Rebuild forçado
docker compose up -d --build --force-recreate
```

### Erro de porta em uso
Altere a porta no `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Mude 3000 para 8080
```

### Build falha
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 Próximas Melhorias

- [ ] Importar diagramas JSON
- [ ] Templates pré-definidos
- [ ] Undo/Redo (Ctrl+Z)
- [ ] Mais formas geométricas
- [ ] Customização de cores das conexões
- [ ] Colaboração em tempo real
- [ ] Auto-save no localStorage

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar!
