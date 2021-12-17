const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const porta = 3000;

app.use(morgan("dev"));
app.use(cors({ origin: "http://grupointegrado.br" }));
app.use(express.json());

const usuario = require("./rotas/usuario");
const nota = require("./rotas/nota");
const login = require("./rotas/login");
const autorizacao = require("./middleware/autorizacao");

app.use("/login", login);
app.use(autorizacao);
app.use("/usuario", usuario);
app.use("/nota", nota);

app.listen(porta, () => {
  console.log(`Aplicação rodando na porta ${porta}`);
});
