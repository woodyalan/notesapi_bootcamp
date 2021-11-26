const { Router } = require("express");
const { Usuario } = require("../bd");
const router = Router();

router.get("/:id?", (req, res) => {
  res.send([]);
});

router.post("/", async (req, res) => {
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

  console.log(novoRegistro);

  res.send(usuario);
});

router.put("/:id", async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;

  const usuario = await Usuario.update(
    {
      nome,
      email,
      senha,
    },
    {
      where: {
        id,
      },
    }
  );

  res.send(usuario);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.destroy({
    where: {
      id,
    },
  });

  res.send({ usuario });
});

module.exports = router;
