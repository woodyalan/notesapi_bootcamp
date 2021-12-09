const jwt = require("jsonwebtoken");
const { palavraChave } = require("../config/token");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send({ mensagem: "Informe um token" });
  }

  jwt.verify(token, palavraChave, (erro, decoded) => {
    if (erro) {
      res.status(500).send({ mensagem: "Falha ao verificar token" });
    }

    req.usuarioId = decoded.id;

    next();
  });
};
