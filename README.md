# Conversor de Unidades

Aplicação web interativa para conversão de unidades de medida, desenvolvida como miniprojeto para a disciplina de versionamento com Git e GitHub.

## Objetivo

Praticar os conceitos de versionamento de software utilizando Git e GitHub, incluindo criação de branches, commits organizados, issues e pull requests — enquanto desenvolvemos uma aplicação web funcional e com boa experiência de usuário.

## Funcionalidades Implementadas

- **Temperatura** — Conversão entre Celsius, Fahrenheit e Kelvin
- **Comprimento** — Conversão entre Metros, Quilômetros, Centímetros, Milímetros, Polegadas, Pés e Milhas
- **Peso / Massa** — Conversão entre Quilogramas, Gramas, Miligramas, Libras, Onças e Toneladas
- **Velocidade** — Conversão entre km/h, m/s, mph e Nós
- **Moeda** — Conversão entre BRL, USD, EUR, GBP, JPY e ARS com taxas de câmbio de referência

### Recursos da Interface

- Conversão em tempo real ao digitar qualquer valor
- Botão de limpeza para cada categoria
- Botão de swap para trocar as unidades selecionadas
- Copiar resultado para área de transferência
- Layout responsivo (funciona em dispositivos móveis)
- Animações suaves nas transições

## Tecnologias Utilizadas

- **React** + **TypeScript** — biblioteca de interface de usuário
- **Vite** — ferramenta de build e desenvolvimento
- **Tailwind CSS** — estilização utilitária
- **Framer Motion** — animações
- **shadcn/ui** — componentes de interface
- **Lucide React** — ícones

## Como Executar

```bash
# Instalar dependências
pnpm install

# Iniciar o servidor de desenvolvimento
pnpm --filter @workspace/conversor-unidades run dev
```

## Estrutura do Projeto

```
artifacts/conversor-unidades/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── App.tsx         # Componente raiz com roteamento
│   └── index.css       # Estilos globais e tema
├── package.json
└── vite.config.ts
```

## Fluxo Git utilizado neste projeto

1. Repositório criado com `main` como branch principal
2. Branch `feature/conversor-temperatura` — implementação do conversor de temperatura
3. Branch `feature/conversor-comprimento` — implementação do conversor de comprimento e demais unidades
4. Issue #1 criada: "Adicionar suporte a conversão de moedas"
5. Commit referenciando a issue: `feat: adiciona conversor de moedas (closes #1)`
6. Pull Request aberta para merge das branches de feature na main
