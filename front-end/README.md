
# Front-end Consultório Médico

Este projeto é um front-end em React para consumir a API REST do consultório médico.

## Funcionalidades

- Listar, adicionar, editar e excluir pacientes
- Listar, adicionar, editar e excluir médicos
- Listar, agendar, editar e cancelar consultas
- Navegação entre páginas com React Router
- Interface responsiva com TailwindCSS
- Feedback visual de sucesso/erro nas ações

## Estrutura de Pastas

- `src/pages` — Páginas principais (Pacientes, Médicos, Consultas)
- `src/components` — Componentes reutilizáveis (Alert, Loader)
- `src/services` — Serviços de integração com a API

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o projeto:
   ```bash
   npm run dev
   ```
3. Acesse em [http://localhost:5173](http://localhost:5173) (padrão Vite)

## Configuração da API

Certifique-se de que a API do consultório médico está rodando em [http://localhost:3001](http://localhost:3001) ou ajuste o `baseURL` em `src/services/api.js`.

## Páginas e Navegação

- **Pacientes:** Listagem, cadastro, edição e exclusão de pacientes.
- **Médicos:** Listagem, cadastro, edição e exclusão de médicos.
- **Consultas:** Listagem, agendamento, edição e cancelamento de consultas.
- Navegação entre páginas pelo menu superior.

## Feedback Visual

Ao realizar qualquer ação (adicionar, editar, excluir, cancelar), uma mensagem de sucesso ou erro será exibida acima do formulário, facilitando o acompanhamento das operações.

## Exemplos de Uso

- Para adicionar um paciente, preencha o formulário e clique em "Adicionar".
- Para editar, clique em "Editar" ao lado do paciente, altere os dados e clique em "Salvar".
- Para excluir, clique em "Excluir".

## Dicas

- Mantenha a API rodando para que o front-end funcione corretamente.
- Caso altere a porta ou endereço da API, ajuste o `baseURL` em `src/services/api.js`.
- O projeto utiliza TailwindCSS para facilitar a personalização visual.

---
Projeto desenvolvido com Vite, React, TailwindCSS e React Router.
