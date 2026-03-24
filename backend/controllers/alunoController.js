const Aluno = require('../models/Aluno');

// 1. Listar todos os alunos
exports.getAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao procurar alunos", error });
    }
};

// 2. Criar um novo aluno
exports.createAluno = async (req, res) => {
    try {
        const novoAluno = new Aluno(req.body);
        await novoAluno.save();
        res.status(201).json(novoAluno);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar aluno", error });
    }
};

// 3. Atualizar um aluno
exports.updateAluno = async (req, res) => {
    try {
        const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(alunoAtualizado);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar", error });
    }
};

// 4. Apagar um aluno
exports.deleteAluno = async (req, res) => {
    try {
        await Aluno.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Aluno removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao apagar", error });
    }
};