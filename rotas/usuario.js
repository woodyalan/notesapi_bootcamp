const { Router } = require("express");
const { getUsuarioById } = require("../controle/usuario");
const router = Router();

router.get("/", async (req, res) => {
  const usuarioId = req.usuarioId;

  let resultado = await getUsuarioById(usuarioId);

  res.send(resultado);
});

module.exports = router;
