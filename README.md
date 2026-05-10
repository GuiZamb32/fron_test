# QuimioAnalytics - Pipeline ETL

Sistema de análise química com pipeline ETL para processamento de dados de espectrometria de massa.

## 🚀 Tecnologias

- React 18
- React Router DOM
- Recharts (gráficos)
- Lucide React (ícones)
- Vite

## 📁 Estrutura do Projeto

```
quimio-analytics/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Top5Ranking.jsx
│   │   ├── Upload.jsx
│   │   └── ChemicalRef.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Paleta de Cores

### Verdes
- `--verde-accent: #04bda2` (Principal)
- `--verde-medium: #098c78`
- `--verde-deep: #025e51`

### Azuis
- `--azul-dark: #034c94`
- `--azul-primary: #016fe1` (Principal)
- `--azul-light: #157eef`

### Vermelhos
- `--vermelho-deep: #520a0a`
- `--vermelho-medium: #8c0909`
- `--vermelho-alert: #bd0404`

### Amarelos
- `--amarelo-deep: #524d0a`
- `--amarelo-medium: #8c8309`
- `--amarelo-alert: #bdb404`

### Neutros/Dark
- `--preto-deep: #0d0d0d` (Background)
- `--preto-pure: #111111`
- `--preto-elevated: #191919`
- `--cinza-dark: #424242`
- `--cinza-muted: #737373`
- `--branco-text: #eaeaea`

## 🛠️ Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:3000
```

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

## 🎯 Funcionalidades

### Dashboard
- Estatísticas gerais (Features, Candidatos, Compostos)
- Gráfico de abundância por amostra
- Gráfico de distribuição por fonte (PubChem, ChEBI, ChemSpider)
- Tabela de últimas atualizações

### Top 5 Ranking
- Lista de features com candidatos ranqueados
- Busca por Feature ID ou nome do composto
- Detalhes de probabilidade e erro de massa
- Informações de fonte de dados

### Upload
- Upload de planilhas de Identificação e Abundância
- Processamento ETL
- Histórico de uploads
- Status de processamento

### Referências Químicas
- Banco integrado de compostos químicos
- Filtro por fonte (PubChem, ChEBI, ChemSpider)
- Busca por nome, fórmula ou InChIKey
- Links para bases de dados externas

## 📝 Notas

- O projeto está configurado para usar o Vite como bundler
- CSS customizado seguindo as cores do IST Ambiental
- Componentes React modulares e reutilizáveis
- Design responsivo para mobile e desktop
