# Conversor de Unidades

Aplicação web interativa para conversão de unidades de medida, desenvolvida como miniprojeto para praticar versionamento com Git e GitHub.

## Objetivo

Praticar os conceitos de versionamento de software utilizando Git e GitHub, incluindo criação de branches, commits organizados, issues e pull requests — enquanto desenvolvemos uma aplicação web funcional, responsiva e fácil de executar no Visual Studio Code.

## Funcionalidades

- **Temperatura** — conversão entre Celsius, Fahrenheit e Kelvin.
- **Comprimento** — conversão entre metros, quilômetros, centímetros, milímetros, polegadas, pés e milhas.
- **Peso / Massa** — conversão entre quilogramas, gramas, miligramas, libras, onças e toneladas.
- **Velocidade** — conversão entre km/h, m/s, mph e nós.
- **Moeda** — conversão entre BRL, USD, EUR, GBP, JPY e ARS com taxas de câmbio de referência.

## Recursos da interface

- Conversão em tempo real ao digitar qualquer valor.
- Botão de limpeza para cada categoria.
- Botão para inverter as unidades selecionadas.
- Botão para copiar o resultado para a área de transferência.
- Layout responsivo para computador e celular.
- Animações suaves nas transições.

## Tecnologias utilizadas

- **React** com **TypeScript**.
- **Vite** para desenvolvimento e build.
- **Tailwind CSS** para estilização.
- **Framer Motion** para animações.
- **Radix UI / shadcn/ui** para componentes de interface.
- **Lucide React** para ícones.

## Como executar no Visual Studio Code

> Requisito: instale o **Node.js 20 ou superior** antes de abrir o projeto.

1. Abra a pasta do projeto no Visual Studio Code.
2. Abra o terminal integrado com `Ctrl + aspas` ou pelo menu **Terminal > Novo Terminal**.
3. Instale as dependências:

```bash
npm install
```

4. Inicie o projeto:

```bash
npm run dev
```

5. Abra o endereço exibido no terminal, normalmente:

```text
http://localhost:5173
```

## Atalhos do VS Code

Também deixei duas tarefas prontas em **Terminal > Executar Tarefa**:

- **Iniciar conversor** — roda `npm run dev`.
- **Gerar build do conversor** — roda `npm run build`.

## Scripts disponíveis

```bash
npm run dev        # inicia o servidor de desenvolvimento
npm run build      # valida TypeScript e gera a versão de produção
npm run preview    # visualiza a versão gerada pelo build
npm run typecheck  # valida apenas os tipos TypeScript
```

## Estrutura do projeto

```text
artifacts/conversor-unidades/
├── src/
│   ├── components/     # componentes reutilizáveis
│   ├── hooks/          # hooks da interface
│   ├── lib/            # funções utilitárias e regras de conversão
│   ├── pages/          # páginas da aplicação
│   ├── App.tsx         # componente raiz com roteamento
│   └── index.css       # estilos globais e tema
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Observação sobre moedas

As conversões de moeda usam taxas fixas de referência para fins didáticos. Para uso real, o ideal é conectar uma API de câmbio atualizada.
