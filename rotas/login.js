const { Router } = require("express");
const { login } = require("../controle/usuario");
const { Usuario } = require("../bd");
const { body, validationResult } = require("express-validator");
const router = Router();

router.post(
  "/",
  body("email").isEmail().withMessage("E-mail no formato inválido"),
  body("senha").trim().not().isEmpty().withMessage("Informe uma senha"),
  body("senha")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Senha deve conter pelo menos 3 caracteres"),
  async (req, res) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).send(erros);
    }

    const { email, senha } = req.body;

    try {
      const token = await login(email, senha);

      if (token) {
        res.send({ token });
      } else {
        res.status(401).send({ mensagem: "Credenciais inválidas" });
      }
    } catch (erro) {
      res.status(500).send({ erro });
    }
  }
);

router.post("/registrar", async (req, res) => {
  const { nome, email, senha } = req.body;

  const [usuario, novoRegistro] = await Usuario.findOrCreate({
    defaults: {
      nome,
      email,
      senha,
    },
    where: {
      email,
    },
  });

  delete usuario.senha;

  res.send(usuario);
});

module.exports = router;
