const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Definir os caminhos
router.get('/', alunoController.getAlunos);        // GET http://localhost:5000/api/alunos
router.post('/', alunoController.createAluno);      // POST http://localhost:5000/api/alunos
router.put('/:id', alunoController.updateAluno);    // PUT http://localhost:5000/api/alunos/ID
router.delete('/:id', alunoController.deleteAluno); // DELETE http://localhost:5000/api/alunos/ID

module.exports = router;