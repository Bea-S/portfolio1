# API REST - Consultório Médico

Esta é uma API REST desenvolvida em Node.js com Express para gerenciar pacientes, médicos e agendamentos de consultas em um consultório médico. Os dados são armazenados em memória (arrays), sem uso de banco de dados.

## Endpoints

- `/patients` - CRUD de pacientes
- `/doctors` - CRUD de médicos
- `/appointments` - CRUD de agendamentos

## Como executar

1. Instale as dependências:
	```bash
	npm install
	```
2. Execute em modo desenvolvimento:
	```bash
	npm run dev
	```
3. Acesse a API em `http://localhost:3000`

## Estrutura de Pastas

- `src/models` - Modelos das entidades
- `src/controllers` - Lógica dos endpoints
- `src/routes` - Rotas da API
- `src/app.js` - Configuração principal do Express
- `src/server.js` - Inicialização do servidor
