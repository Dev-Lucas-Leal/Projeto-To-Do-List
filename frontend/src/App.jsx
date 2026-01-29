import { useEffect, useState } from "react"; 

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    buscarTarefas();
  }, []);

  function buscarTarefas() {
    fetch("http://localhost:3000/tarefas")
      .then(res => res.json())
      .then(data => setTarefas(data));
  }

  function adicionarTarefa(e) {
    e.preventDefault();
    if(!titulo.trim()) return;

    fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo })
    })
      .then(() => {
        setTitulo("");
        buscarTarefas();
      });
  }

  function removerTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "DELETE"
    }).then(() => buscarTarefas());
  }

  return (
    <div className="container">
      <h1>To Do List</h1>

      <form onSubmit={adicionarTarefa}>
        <input
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Digite a tarefa"
        />
        <button>Adicionar</button>
      </form>

      <ul>
        {tarefas.map(t => (
          <li key={t.id}>
            <span>{t.titulo}</span>
            <button onClick={() => removerTarefa(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
