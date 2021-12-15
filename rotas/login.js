const { Router } = require("express");
const { login } = require("../controle/usuario");
const { Usuario } = require("../bd");
const router = Router();

router.post("/", async (req, res) => {
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
});

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
