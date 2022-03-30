const express = require("express");
const app = express();
const data = require("./data.json"); // chama reuisições do banco de dados

// Verbos HTTP 

// Metodos de requisição

// GET: Receber Dados de um resource
// POST: Enviar dados ou informções para serem processadas por um resource
// PUT: Atualizar dados de source 
// DELETE: Deletar um resource

// http:// localhost:3000/clients  //// nesse caso cliente = resource

app.use(express.json());

// Chame todos os clientes
app.get("/clients", (req, res) => {
    res.json(data);
});

// Busca cliente por id
app.get("/clients/:id", (req, res) => {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    res.json(client);
});

app.post("/clients", (req, res) => {
    const { id, name, email } = req.body;

    // salvar Novov cliente

    res.json({ id, name, email });
});

// Atualizar cliente
app.put("/clients/:id", (req, res) => {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    const { name } = req.body;

    client.name = name;

    res.json(client);
});

app.delete("/clients/:id", (req, res) => {
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id);

    res.json(clientsFiltered);
});

app.listen(3000, () => {
    console.log("Server is running");
});