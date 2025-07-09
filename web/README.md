# LiveQuery

Aplicação web desenvolvida por **Henrique J. Araujo** que demonstra o consumo de dados em tempo-real através de salas (rooms) e gerenciamento de estado de forma declarativa.

## Tecnologias Principais

- **React 19** + **Vite** — criação de SPA com _Hot Module Replacement_ instantâneo.
- **TypeScript** — tipagem estática de primeira classe.
- **Tailwind CSS 4** (`@tailwindcss/vite`) — utilitários de estilo com design _utility-first_.
  - `tw-animate-css` para animações prontas.
  - `tailwind-merge` + `clsx` para composição e deduplicação de classes.
- **class-variance-authority** + **@radix-ui/react-slot** — construção de componentes desacoplados (padrão _headless/shadcn_).
- **TanStack React Query 5** — cache, sincronização e _fetching_ de dados.
- **React Router DOM 7** — roteamento declarativo.
- **lucide-react** — biblioteca de ícones.
- **ESLint** & **Biome** — análise estática e formatação de código.

## Padrões de Projeto / Arquitetura

- Estrutura em módulos lógicos: `src/pages`, `src/components`, `src/lib`.
- Componentes de UI funcionais com variações via C.V.A. (```button.tsx```).
- Estilização _utility-first_ + temas (claro/escuro) com **CSS Custom Properties**.
- Data-fetching centralizado em _hooks_ (`useQuery`, `useMutation`).
- Roteamento controlado em `App.tsx` usando _nested routes_.

## Requisitos

- **Node.js >= 18**
- **npm >= 9** ou **pnpm/yarn** compatível

## Setup Rápido

```bash
# 1. Clone o repositório
$ git clone <repo-url>
$ cd liveQuery/web

# 2. Instale as dependências
$ npm install  # ou pnpm install / yarn

# 3. Ambiente de desenvolvimento
$ npm run dev
```

O servidor local abrirá em `http://localhost:5173` (porta padrão do Vite).

## Build para Produção

```bash
# gera artefatos otimizados em dist/
$ npm run build

# visualiza a build localmente
$ npm run preview
```

## Scripts Úteis

| Comando          | Descrição                                   |
| ---------------- | ------------------------------------------- |
| `npm run lint`   | Verifica problemas de estilo e qualidade.   |
| `npm run dev`    | Inicia ambiente de desenvolvimento.         |
| `npm run build`  | Gera versão de produção em `dist/`.         |
| `npm run preview`| Serve a build para inspeção local.          |

---

Distribuído sob licença **MIT**.
