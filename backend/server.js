// API real a ser implementada
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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
  res.send('O Backend real já está a funcionar!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor real a correr em http://localhost:${PORT}`);
});