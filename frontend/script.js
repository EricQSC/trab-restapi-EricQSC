// JS para operações CRUD com Fetch API
const API_URL = "https://trab-restapi-ericqsc.onrender.com";

// Função para carregar e listar alunos
async function carregarAlunos() {
    const response = await fetch(API_URL);
    const alunos = await response.json();
    
    const tbody = document.getElementById("lista-alunos");
    tbody.innerHTML = ""; 

    alunos.forEach(aluno => {
        tbody.innerHTML += `
            <tr>
                <td>${aluno._id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.apelido}</td>
                <td>${aluno.idCurso}</td>
                <td>${aluno.anoCurricular}</td>
                <td>
                    <button onclick="prepararEdicao('${aluno._id}', '${aluno.nome}', '${aluno.apelido}', ${aluno.idCurso}, ${aluno.anoCurricular})">Editar</button>
                    <button onclick="apagarAluno('${aluno._id}')">Apagar</button>
                </td>
            </tr>
        `;
    });
}

// Função para Salvar (Adicionar ou Editar)
document.getElementById("btn-salvar").addEventListener("click", async () => {
    const id = document.getElementById("aluno-id").value;
    const aluno = {
        nome: document.getElementById("nome").value,
        apelido: document.getElementById("apelido").value,
        idCurso: parseInt(document.getElementById("idCurso").value),
        anoCurricular: parseInt(document.getElementById("anoCurricular").value)
    };

    if (id) {
        // Se tem ID, estamos a EDITAR (PUT)
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });
    } else {
        // Se não tem ID, estamos a ADICIONAR (POST)
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });
    }

    limparFormulario();
    carregarAlunos();
});

// Função para colocar os dados do aluno no formulário para editar
function prepararEdicao(id, nome, apelido, idCurso, ano) {
    document.getElementById("aluno-id").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("apelido").value = apelido;
    document.getElementById("idCurso").value = idCurso;
    document.getElementById("anoCurricular").value = ano;
    
    document.getElementById("form-title").innerText = "Editar Aluno";
    document.getElementById("btn-cancelar").style.display = "inline";
}

// Função para apagar aluno
async function apagarAluno(id) {
    if (confirm("Desejas apagar este aluno?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        carregarAlunos();
    }
}

function limparFormulario() {
    document.getElementById("aluno-id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("apelido").value = "";
    document.getElementById("idCurso").value = "";
    document.getElementById("anoCurricular").value = "";
    document.getElementById("form-title").innerText = "Adicionar Aluno";
    document.getElementById("btn-cancelar").style.display = "none";
}

document.getElementById("btn-cancelar").addEventListener("click", limparFormulario);

// Iniciar a lista ao abrir a página
carregarAlunos();