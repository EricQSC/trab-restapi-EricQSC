const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

/**
 * @swagger
 * components:
 * schemas:
 * Aluno:
 * type: object
 * required:
 * - nome
 * - apelido
 * - idCurso
 * - anoCurricular
 * properties:
 * _id:
 * type: string
 * description: ID gerado automaticamente pelo MongoDB
 * nome:
 * type: string
 * description: O primeiro nome do aluno
 * apelido:
 * type: string
 * description: O apelido do aluno
 * idCurso:
 * type: number
 * description: Código identificador do curso
 * anoCurricular:
 * type: number
 * description: Ano curricular que o aluno frequenta
 * example:
 * nome: "Eric"
 * apelido: "Cancela"
 * idCurso: 1
 * anoCurricular: 2
 */

/**
 * @swagger
 * tags:
 * name: Alunos
 * description: Gestão de Alunos (Operações CRUD)
 */

/**
 * @swagger
 * /api/alunos:
 * get:
 * summary: Retorna a lista de todos os alunos
 * tags: [Alunos]
 * responses:
 * 200:
 * description: Lista de alunos obtida com sucesso
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Aluno'
 */
router.get('/', alunoController.getAlunos);

/**
 * @swagger
 * /api/alunos:
 * post:
 * summary: Cria um novo aluno na base de dados
 * tags: [Alunos]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Aluno'
 * responses:
 * 201:
 * description: Aluno criado com sucesso
 * 500:
 * description: Erro no servidor
 */
router.post('/', alunoController.createAluno);

/**
 * @swagger
 * /api/alunos/{id}:
 * put:
 * summary: Atualiza os dados de um aluno existente
 * tags: [Alunos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do aluno a atualizar
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Aluno'
 * responses:
 * 200:
 * description: Aluno updated com sucesso
 * 404:
 * description: Aluno não encontrado
 */
router.put('/:id', alunoController.updateAluno);

/**
 * @swagger
 * /api/alunos/{id}:
 * delete:
 * summary: Remove um aluno da base de dados
 * tags: [Alunos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID do aluno a apagar
 * responses:
 * 200:
 * description: Aluno removido com sucesso
 * 404:
 * description: Aluno não encontrado
 */
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;