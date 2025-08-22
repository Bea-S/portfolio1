Projeto: Portfolio1 – API REST de Consultório Médico com Frontend

Este projeto é um sistema  de gestão de consultório médico, desenvolvido para estudo e demonstração de habilidades em desenvolvimento web fullstack.

Ele inclui:

💻 Backend

Desenvolvido em Node.js com Express.

Endpoints para CRUD de pacientes, médicos e agendamentos.

Dados armazenados em memória (arrays), sem banco de dados, facilitando testes rápidos.

Documentação da API disponível via Swagger, permitindo testar e explorar os endpoints facilmente.

Estrutura organizada com models, controllers e routes, seguindo boas práticas de arquitetura.

🌐 Frontend

Desenvolvido em React.js com Vite.

Interface simples e funcional para interagir com a API.

Estilizado com Tailwind CSS.

🧪 Testes Automatizados

Testes escritos com Mocha e Supertest.

Cobrem funcionalidades principais da API, garantindo confiabilidade dos endpoints.

🚀 Como executar

Instalar dependências no backend:

cd backend
npm install
npm run dev


Instalar dependências no frontend:

cd front-end
npm install
npm run dev


Acessar a aplicação:

Backend: http://localhost:3000

Frontend: http://localhost:5173

Swagger: http://localhost:3000/api-docs

📁 Estrutura do projeto
portfolio1/
├── backend/          # Servidor e API
├── front-end/        # Aplicação frontend
├── src/              # Arquivos principais do projeto
├── test/             # Testes automatizados
├── package.json      
├── package-lock.json 
└── README.md
