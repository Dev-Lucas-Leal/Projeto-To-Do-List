const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tarefas = [];
let id = 1;

// Listar tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Criar tarefa
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  const novaTarefa = {
    id: id++,
    titulo
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Deletar tarefa
app.delete("/tarefas/:id", (req, res) => {
  const idParam = Number(req.params.id);
  tarefas = tarefas.filter(t => t.id !== idParam);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});