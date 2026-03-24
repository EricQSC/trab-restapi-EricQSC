const mongoose = require('mongoose');

// Este esquema define como um "Aluno" será guardado no MongoDB real
const alunoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    apelido: { type: String, required: true },
    idCurso: { type: Number, required: true },
    anoCurricular: { type: Number, required: true }
}, { 
    timestamps: true // Cria automaticamente campos de "criado em" e "atualizado em"
});

// Exportamos o modelo para ser usado noutros ficheiros
module.exports = mongoose.model('Aluno', alunoSchema);