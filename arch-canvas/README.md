# Architecture Canvas MVP

Um Web App minimalista para criação de diagramas de arquitetura de software.

## Funcionalidades

### Canvas Interativo
- **Fundo branco com grid discreto** (padrão de pontos)
- **Formas disponíveis**: Círculos, Retângulos e Texto
- **Sistema de conexões inteligentes**: Arraste das handles para conectar formas
- **Arrastar e redimensionar**: Mova os elementos livremente pelo canvas
- **Edição por clique duplo**: Clique duas vezes em qualquer nó para editar seu rótulo

### Barra de Ferramentas
- Seleção de formas (Círculo, Retângulo, Texto)
- Exportação como JSON
- Exportação como PNG (placeholder para implementação futura)

### Painel Lateral de Documentação
- Editor Markdown em tempo real
- Preview simultâneo do Markdown renderizado
- Lista de nós do diagrama com edição rápida
- Contador de elementos (nós e conexões)
- Painel colapsável para maximizar o espaço do canvas

## Tecnologias Utilizadas

- **React 18** - Framework UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização utilitária
- **React Flow (@xyflow/react)** - Biblioteca para canvas interativo e conexões
- **React Markdown** - Renderização de Markdown
- **Lucide React** - Ícones modernos e minimalistas

## Como Usar

### Instalação

```bash
cd arch-canvas
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento estará disponível em `http://localhost:5173`

### Build de Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## Instruções de Uso

1. **Adicionar Formas**:
   - Selecione uma forma na barra de ferramentas superior
   - Clique em qualquer lugar do canvas para adicionar a forma

2. **Criar Conexões**:
   - Passe o mouse sobre uma forma para ver as handles (pontos cinzas)
   - Clique e arraste de uma handle até outra forma
   - A conexão será criada automaticamente com estilo de seta

3. **Editar Elementos**:
   - Clique duplo em qualquer nó para editar seu texto
   - Pressione Enter ou clique fora para salvar

4. **Documentação**:
   - Use o painel lateral direito para escrever documentação em Markdown
   - O preview é atualizado em tempo real
   - Edite os rótulos dos nós diretamente na lista "Nodes"

5. **Exportar**:
   - Clique em "JSON" para baixar o diagrama como arquivo JSON
   - Clique em "PNG" para exportar como imagem (funcionalidade placeholder)

6. **Navegação**:
   - Use os controles no canto inferior esquerdo para zoom e pan
   - Arraste o canvas para navegar
   - Use a roda do mouse para zoom

## Estrutura do Projeto

```
arch-canvas/
├── src/
│   ├── components/
│   │   ├── CustomNode.jsx    # Componente personalizado de nós
│   │   ├── Toolbar.jsx       # Barra de ferramentas superior
│   │   └── Sidebar.jsx       # Painel lateral de documentação
│   ├── App.jsx               # Componente principal
│   ├── index.css             # Estilos globais + Tailwind
│   └── main.jsx              # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Próximos Passos (Melhorias Futuras)

- [ ] Implementar exportação PNG real com html2canvas
- [ ] Adicionar mais tipos de formas (losango, triângulo, etc.)
- [ ] Sistema de undo/redo
- [ ] Templates de arquitetura pré-definidos
- [ ] Colaboração em tempo real
- [ ] Importar diagramas JSON
- [ ] Customização de cores e estilos das conexões
- [ ] Snap to grid para alinhamento preciso

## Licença

MIT
