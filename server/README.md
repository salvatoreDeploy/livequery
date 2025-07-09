# LiveQuery

Projeto servidor **LiveQuery** desenvolvido por **Henrique J. Araujo** para estudos de APIs tempo-real e consultas eficientes.

## Tecnologias principais

- **Node.js** + **TypeScript** (ES2022)
- **Fastify** & **@fastify/cors** – servidor HTTP performático
- **Zod** & **fastify-type-provider-zod** – validação e tipagem de rotas
- **Drizzle ORM** & **drizzle-kit** – ORM & migrações _code-first_
- **PostgreSQL** + extensão **pgvector** (via Docker)
- **drizzle-seed** – geração de dados fake
- **Biome** – lint / formatador todo-em-um

## Padrões e convenções

- **Validação de variáveis de ambiente** `src/env.ts` com Zod.
- **Rotas modularizadas** em `src/http/routes/*` usando _plugins_ Fastify.
- **Schema do banco como código** em `src/database/schema/*` e migrações automáticas (`drizzle-kit pull/push`).
- **Seeds tipados** com `drizzle-seed`.
- **Configuração estrita** do TypeScript (`strict: true`) e estilo garantido pelo Biome.

## Requisitos

1. **Node.js** >= 20
2. **Docker** & **docker-compose** (ou PostgreSQL local 17+ com pgvector)

## Setup rápido

```bash
# 1. Clone o repositório
$ git clone <url> && cd liveQuery/server

# 2. Instale dependências
$ npm install

# 3. Copie o exemplo de env e ajuste (porta e DATABASE_URL)
$ cp .env.example .env

# 4. Levante o Postgres com pgvector
$ docker-compose up -d

# 5. Crie as tabelas (migrações)
$ npx drizzle-kit migrate

# 6. Popule dados de exemplo (opcional)
$ npm run db:seed

# 7. Inicie a API em modo dev
$ npm run dev
```

A API ficará acessível em `http://localhost:3333`.

## Endpoints básicos

| Método | Rota        | Descrição          |
| ------ | ----------- | ------------------ |
| GET    | /health     | Checagem de saúde  |
| GET    | /rooms      | Lista de salas     |

Arquivo `client.http` contém exemplos de requisições.

## Scripts npm

- `npm run dev` – inicia o servidor em _watch mode_
- `npm run db:seed` – reseta e insere dados fake

## Estrutura resumida

```
src/
├─ env.ts                # validação das envs
├─ server.ts             # bootstrap Fastify
├─ http/
│  └─ routes/            # plugins de rota
└─ database/
   ├─ schema/            # definição das tabelas
   ├─ migrations/        # migrações geradas
   └─ seed.ts            # script de seed
```

## Licença

MIT © Henrique J. Araujo 