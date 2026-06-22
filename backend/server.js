// API real a ser implementada
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestão de Alunos',
      version: '1.0.0',
      description: 'Documentação oficial da API de Gestão de Alunos do projeto prático.',
      contact: {
        name: 'Suporte API'
      }
    },
    servers: [
      {
        url: 'https://trab-restapi-ericqsc.onrender.com',
        description: 'Servidor de Produção (Render)'
      },
      {
        url: 'http://localhost:5000',
        description: 'Servidor Local (Desenvolvimento)'
      }
    ]
  },
  // Onde o Swagger vai procurar os comentários das rotas
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware (permite ler JSON e aceitar pedidos do frontend)
app.use(cors());
app.use(express.json());

const alunoRoutes = require('./routes/alunoRoutes');
app.use('/api/alunos', alunoRoutes);

// Ligação ao MongoDB Atlas usando a chave que guardámos no .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Ligado ao MongoDB Atlas com sucesso!'))
  .catch(err => console.error('❌ Erro ao ligar ao MongoDB:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('O Backend real já está a funcionar! Acede a /api-docs para ver a documentação.');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor real a correr em http://localhost:${PORT}`);
  console.log(`📄 Documentação Swagger em http://localhost:${PORT}/api-docs`);
});