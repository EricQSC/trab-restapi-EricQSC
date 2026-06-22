const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do Swagger em Objeto JavaScript (À prova de erros de formatação)
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Gestão de Alunos',
    version: '1.0.0',
    description: 'Documentação oficial da API de Gestão de Alunos.'
  },
  servers: [
    { url: 'https://trab-restapi-ericqsc.onrender.com', description: 'Produção' },
    { url: 'http://localhost:5000', description: 'Local' }
  ],
  components: {
    schemas: {
      Aluno: {
        type: 'object',
        required: ['nome', 'apelido', 'idCurso', 'anoCurricular'],
        properties: {
          _id: { type: 'string', description: 'ID gerado pelo MongoDB' },
          nome: { type: 'string' },
          apelido: { type: 'string' },
          idCurso: { type: 'number' },
          anoCurricular: { type: 'number' }
        }
      }
    }
  },
  paths: {
    '/api/alunos': {
      get: {
        summary: 'Lista todos os alunos',
        tags: ['Alunos'],
        responses: { '200': { description: 'Sucesso' } }
      },
      post: {
        summary: 'Cria um novo aluno',
        tags: ['Alunos'],
        responses: { '201': { description: 'Criado com sucesso' } }
      }
    },
    '/api/alunos/{id}': {
      put: {
        summary: 'Atualiza um aluno existente',
        tags: ['Alunos'],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Atualizado com sucesso' } }
      },
      delete: {
        summary: 'Apaga um aluno',
        tags: ['Alunos'],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Apagado com sucesso' } }
      }
    }
  }
};

// Ligar o Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const alunoRoutes = require('./routes/alunoRoutes');
app.use('/api/alunos', alunoRoutes);

// Ligação à Base de Dados
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Ligado ao MongoDB Atlas com sucesso!'))
  .catch(err => console.error('❌ Erro ao ligar ao MongoDB:', err));

// Rota Base
app.get('/', (req, res) => {
  res.send('O Backend real já está a funcionar! Acede a /api-docs para a documentação.');
});

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor real a correr em http://localhost:${PORT}`);
});