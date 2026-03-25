# E-commerce Products - Next.js

Este é um projeto de e-commerce desenvolvido com [Next.js](https://nextjs.org), criado para demonstrar boas práticas de desenvolvimento com React, testes automatizados e consumo de APIs.

## Tecnologias Utilizadas

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Material UI** - Componentes de interface
- **TanStack Query (React Query)** - Gerenciamento de estado assíncrono
- **Jest + React Testing Library** - Testes unitários e de integração
- **React Icons** - Biblioteca de ícones

## Funcionalidades

- Listagem de produtos com grid responsivo (1 coluna no mobile, 4 colunas no desktop)
- Página de detalhes do produto com informações completas
- Header responsivo com menu mobile e desktop
- Footer com links institucionais e redes sociais
- Tratamento de estados de loading e erro
- Testes unitários para componentes principais, hooks e serviços

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/alex-correa-dev/ecommerce-products-next-react.git

# Acesse a pasta do projeto
cd ecommerce-products-next-react

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Executando em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar o projeto.

### Build para Produção

```bash
npm run build
npm start
```

### Testes

O projeto utiliza Jest e React Testing Library para testes unitários.

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Estrutura do Projeto

```
src/
├── app/                    # Páginas e layouts (App Router)
├── components/             # Componentes React
│   ├── common/             # Componentes compartilhados (Header, Footer)
│   ├── products/           # Componentes relacionados a produtos
│   └── ui/                 # Componentes de UI (facade do Material UI)
│   └── icons/              # Componentes de ícones (facade do react-icons)
├── hooks/                  # Hooks customizados
├── services/               # Serviços e chamadas API
├── providers/              # Providers (React Query, etc.)
```

### API Utilizada

O projeto consome a [Fake Store API](https://fakestoreapi.com), uma API REST gratuita para testes e desenvolvimento de e-commerces.

### Limitação Conhecida

A API `/products` retorna apenas uma lista fixa de produtos sem suporte a paginação (não fornece parâmetros como `limit`, `skip` ou `offset`). Por esse motivo, a implementação de paginação não foi incluída nesta versão, pois exigiria funcionalidades não suportadas pelo backend.

## Possíveis Melhorias Futuras

### Funcionalidades

- **Paginação real** - Implementar paginação completa quando a API suportar

### SEO e Performance

- **SEO** - Melhorar metadados dinâmicos para cada produto, implementar sitemap e robots.txt

### Testes

- **Testes E2E com Cypress ou Playwright** - Implementar testes end-to-end para fluxos críticos

- **Testes de performance** - Monitorar métricas como Core Web Vitals

### DevOps e Infraestrutura

- **CI/CD** - Configurar pipeline de integração e entrega contínua com Github Actions

- **Monitoramento** - Adicionar ferramentas de observabilidade (Sentry, LogRocket)

### Deploy

O projeto está configurado para deploy na [Vercel](https://vercel.com/). Acesse a versão em produção:

[https://ecommerce-products-next-react.vercel.app/](https://ecommerce-products-next-react.vercel.app/)

### Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](https://license/) para mais informações.

### Contato

Alex Corrêa - [GitHub](https://github.com/alex-correa-dev)