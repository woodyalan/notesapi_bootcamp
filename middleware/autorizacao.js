const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { palavraChave } = require("../config/token");

module.exports = [
  check("authorization").isJWT().withMessage("Token deve estar no formato JWT"),
  (req, res, next) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).send(erros);
    }

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
  },
];
