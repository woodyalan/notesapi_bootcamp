const express = require("express");
const cors = require("cors");
const app = express();
const porta = 3000;

app.use(cors({ origin: "http://grupointegrado.br" }));
app.use(express.json());

const usuario = require("./rotas/usuario");
const nota = require("./rotas/nota");

app.use("/usuario", usuario);
app.use("/nota", nota);

app.listen(porta, () => {
  console.log(`Aplicação rodando na porta ${porta}`);
});
