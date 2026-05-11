# QuimioAnalytics | Inteligência em Dados Químicos

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

O **QuimioAnalytics** é uma plataforma analítica avançada desenvolvida para o **IST Ambiental**, focada no processamento e visualização de dados provenientes de pipelines ETL de espectrometria de massa. O sistema integra resultados complexos de identificação química em uma interface intuitiva para suporte à tomada de decisão.

---

##  Visão Geral da Solução

O sistema atua na camada de apresentação (Frontend) de um ecossistema ETL, permitindo que pesquisadores e analistas interajam com dados de identificação de compostos, verifiquem probabilidades analíticas e gerenciem o fluxo de dados brutos para processamento.

### Principais Módulos:
- **Core Dashboard:** Métricas de performance de identificação e distribuição de fontes.
- **Top 5 Ranking Engine:** Visualização hierárquica de candidatos moleculares com filtros dinâmicos.
- **ETL Management (Upload):** Interface para ingestão de datasets de Abundância e Identificação.
- **Chemical Knowledge Base:** Consultas rápidas a referências integradas (PubChem, ChEBI, ChemSpider).

---

##  Stack Tecnológica

### Frontend & Core
- **React 18:** Com hooks customizados para gerenciamento de estado.
- **Vite:** Ferramenta de build de próxima geração para performance superior.
- **React Router DOM:** Gestão de roteamento Single Page Application (SPA).

### Visualização de Dados & UI
- **Recharts:** Renderização de gráficos vetoriais (SVG) responsivos.
- **Lucide React:** Conjunto de ícones consistentes para interfaces técnicas.
- **CSS3 Variables:** Arquitetura de estilos baseada em design tokens (Paleta IST Ambiental).

---

##  Design System (Tokens de Cor)

A interface utiliza um tema **Dark Mode** de alto contraste, otimizado para longos períodos de análise laboratorial:

| Categoria | Hex Code | Aplicação |
| :--- | :--- | :--- |
| **Accent Primary** | `#04BDA2` | Sucesso, Químicos identificados, botões principais. |
| **Primary Blue** | `#016FE1` | Identidade visual, Links, Informações neutras. |
| **Alert Red** | `#BD0404` | Erros de massa críticos, Falhas de processamento. |
| **Surface Dark** | `#0D0D0D` | Fundo principal da aplicação. |
| **Surface Elevated**| `#191919` | Cards, modais e containers de tabelas. |

---

##  Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- Gerenciador de pacotes (npm ou yarn)

### Passo a Passo

1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/quimio-analytics.git](https://github.com/seu-usuario/quimio-analytics.git)
    cd quimio-analytics
    ```

2.  **Instalar dependências:**
    ```bash
    npm install
    ```

3.  **Ambiente de Desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Compilação de Produção:**
    ```bash
    npm run build
    ```

---

##  Arquitetura de Diretórios

```text
src/
├── assets/          # Recursos estáticos (Logos, imagens)
├── components/      # Componentes globais (Navbar, Shared UI)
├── pages/           # Views principais da aplicação (Smart Components)
│   ├── Dashboard/   # Analytics e Gráficos
│   ├── Ranking/     # Tabelas de probabilidade
│   ├── Upload/      # Gestão de arquivos e ETL
│   └── Reference/   # Base de dados químicos
├── styles/          # Definições globais de CSS e Design Tokens
├── App.jsx          # Configuração de rotas e Context Provider
└── main.jsx         # Ponto de entrada do DOM
