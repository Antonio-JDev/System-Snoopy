# Sistema FoodConnect

Plataforma web de gestao operacional para lanchonete, com foco em centralizar estoque, pedidos, financeiro, logistica e acompanhamento de indicadores em um unico fluxo.

## Pitch do Projeto

O Sistema SnoopyDog foi idealizado para reduzir retrabalho operacional e apoiar decisoes com dados em tempo real no contexto de pequenas operacoes de alimentacao.  
A proposta e transformar processos manuais e descentralizados em uma experiencia digital unificada, com autentificacao, rastreabilidade e visao gerencial.

## Resumo para Recrutadores

Projeto full stack autoral com foco em digitalizacao de operacoes e controle gerencial no segmento de alimentacao.

- Produto idealizado e estruturado do zero
- Arquitetura frontend + backend + banco relacional
- Implementacao de autenticacao, modulos de negocio e base para escalabilidade
- Entrega orientada a problema real de operacao

## Resumo Tecnico

- Aplicacao SPA em React + TypeScript, com componentes reutilizaveis e roteamento protegido
- API REST em Node.js/Express com autenticacao JWT e hash de senha com bcryptjs
- Persistencia com Prisma ORM + PostgreSQL
- Ambiente local reproduzivel via Docker Compose
- Estrutura modular para evolucao por dominio (estoque, financeiro, logistica, relatorios)

## Stack Tecnologica

### Frontend
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router
- Axios
- Recharts

### Backend
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT + bcryptjs (autenticacao e seguranca)
- dotenv

### Infraestrutura
- Docker Compose (PostgreSQL)
- Ambiente local com frontend e backend desacoplados

## Arquitetura (Visao Geral)

- `frontend/`: aplicacao cliente SPA com telas de operacao e gestao
- `backend/`: API REST, regras de negocio, autenticacao e acesso a dados
- `backend/prisma/`: schema, migracoes e seed de dados
- `docker-compose.yml`: provisionamento do banco PostgreSQL local

## Funcionalidades Principais

- Login com autenticacao JWT
- Dashboard com indicadores
- Modulo de estoque
- Modulo financeiro
- Modulo de roteirizacao/logistica
- Estrutura para expansao dos modulos de pedidos, mensagens e relatorios

## Como Executar Localmente

### 1) Banco de dados
```bash
docker compose up -d
```

### 2) Backend
```bash
cd backend
npm install
npm run dev
```

### 3) Frontend
```bash
cd frontend
npm install
npm run dev
```

## Variaveis de Ambiente

- Use `backend/.env.example` como referencia para criar o `backend/.env`.
- Crie o `frontend/.env` com as configuracoes da API.
- Arquivos `.env` sao confidenciais e nao devem ser versionados.

## Autor e Propriedade Intelectual

Este projeto e de autoria de **Antonio JDev**, responsavel por:
- levantamento de requisitos;
- definicao funcional e tecnica;
- analise de negocio e arquitetura;
- implementacao completa do sistema do zero como unico desenvolvedor e analista.

Todo o codigo-fonte, documentacao, regras de negocio e ativos relacionados ao Sistema SnoopyDog sao de propriedade exclusiva do autor.

## Licenca e Uso

**Projeto proprietario (todos os direitos reservados).**

Este repositorio **nao** esta sob licenca livre/open source.  
E proibida a copia, redistribuicao, modificacao, publicacao, sublicenciamento ou uso comercial sem autorizacao expressa e formal do autor.
