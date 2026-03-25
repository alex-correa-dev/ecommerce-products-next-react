# Regras (Rules) para IA

Durante o desenvolvimento, as seguintes regras foram aplicadas:

1. **Arquitetura**: Organizar código por features
2. **Componentes**: Preferir componentes funcionais com TypeScript
3. **Estilização**: Usar Tailwind
4. **Query**: Utilizar React Query para dados de API
5. **Testes**: Escrever testes unitários para componentes e hooks principais
6. **Next.js**: Aplicar SSR na página de produto e na listagem. Não usamos SSG porque as páginas são conteúdos que se alteram frequentemente
7. **SOLID**: Manter separação de responsabilidades (SRP) e inversão de dependência onde aplicável